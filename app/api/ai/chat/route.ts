import { NextRequest } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Product from '@/models/Product';
import Order from '@/models/Order';
import { aiChatbot } from '@/lib/groqService';
import { successResponse, errorResponse } from '@/lib/utils';
import { getUserFromRequest } from '@/lib/jwt';

// Handle CORS preflight
export { OPTIONS } from '@/lib/cors';

// POST /api/ai/chat - AI chatbot assistant with full product and order context
export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const body = await request.json();
    const { message } = body;

    if (!message) {
      return errorResponse('Message is required', 400);
    }

    // Get user info from token (if authenticated)
    const user = getUserFromRequest(request);
    const userId = user?.userId || null;
    let userOrders: any[] = [];

    // Get ALL products with full details
    const products = await Product.find({}).lean();
    
    // Get user's order history if authenticated
    if (userId) {
      userOrders = await Order.find({ userId }).sort({ timestamp: -1 }).limit(10).lean();
    }

    // Build comprehensive context
    let contextStr = `\n=== NEXORA PRODUCT CATALOG ===\n`;
    contextStr += `Total Products: ${products.length}\n\n`;
    
    // Group products by category
    const productsByCategory: Record<string, any[]> = {};
    products.forEach(product => {
      if (!productsByCategory[product.category]) {
        productsByCategory[product.category] = [];
      }
      productsByCategory[product.category].push(product);
    });

    // Add detailed product information
    Object.entries(productsByCategory).forEach(([category, items]) => {
      contextStr += `\n📂 ${category.toUpperCase()} (${items.length} items):\n`;
      items.forEach(p => {
        contextStr += `  • [ID: ${p._id}] ${p.name}\n`;
        contextStr += `    Price: $${p.price} | Stock: ${p.stock} | Rating: ${p.rating}⭐\n`;
        contextStr += `    Description: ${p.description}\n`;
        if (p.tags && p.tags.length > 0) {
          contextStr += `    Tags: ${p.tags.join(', ')}\n`;
        }
        contextStr += `\n`;
      });
    });

    // Add user order history if available
    if (userOrders.length > 0) {
      contextStr += `\n=== YOUR ORDER HISTORY ===\n`;
      contextStr += `Total Orders: ${userOrders.length}\n\n`;
      userOrders.forEach((order: any, index) => {
        contextStr += `${index + 1}. Order #${order.orderId}\n`;
        contextStr += `   Date: ${new Date(order.timestamp).toLocaleDateString()}\n`;
        contextStr += `   Status: ${order.status}\n`;
        contextStr += `   Total: $${order.total}\n`;
        contextStr += `   Items: ${order.items.map((item: any) => `${item.name} (x${item.quantity})`).join(', ')}\n\n`;
      });
    } else if (userId) {
      contextStr += `\n=== YOUR ORDER HISTORY ===\nNo previous orders found. This is your first time shopping with us!\n\n`;
    }

    // Add helpful statistics
    const categories = Object.keys(productsByCategory);
    const avgPrice = products.reduce((sum, p) => sum + p.price, 0) / products.length;
    const topRated = products.filter(p => p.rating >= 4.5).length;
    
    contextStr += `\n=== STORE STATISTICS ===\n`;
    contextStr += `Categories Available: ${categories.join(', ')}\n`;
    contextStr += `Average Price: $${avgPrice.toFixed(2)}\n`;
    contextStr += `Top Rated Products (4.5★+): ${topRated}\n`;
    contextStr += `In Stock Items: ${products.filter(p => p.stock > 0).length}\n`;

    const response = await aiChatbot(message, contextStr);

    return successResponse({ message: response });
  } catch (error: any) {
    console.error('AI Chatbot Error:', error);
    return errorResponse(error.message || 'Failed to get chatbot response');
  }
}
