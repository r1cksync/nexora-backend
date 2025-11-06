export default function BackendHome() {
  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Nexora Backend API</h1>
      <p>Backend API is running successfully!</p>
      <h2>Available Endpoints:</h2>
      <ul>
        <li><strong>GET</strong> /api/products - Get all products</li>
        <li><strong>GET</strong> /api/products/[id] - Get single product</li>
        <li><strong>POST</strong> /api/products/[id]/reviews - Add product review</li>
        <li><strong>GET</strong> /api/cart?userId=xxx - Get cart</li>
        <li><strong>POST</strong> /api/cart - Add to cart</li>
        <li><strong>DELETE</strong> /api/cart/[id] - Remove from cart</li>
        <li><strong>POST</strong> /api/checkout - Process checkout</li>
        <li><strong>GET</strong> /api/orders?userId=xxx - Get order history</li>
        <li><strong>GET</strong> /api/wishlist?userId=xxx - Get wishlist</li>
        <li><strong>POST</strong> /api/wishlist - Add to wishlist</li>
        <li><strong>POST</strong> /api/ai/recommendations - Get AI recommendations</li>
        <li><strong>POST</strong> /api/ai/search - AI semantic search</li>
        <li><strong>POST</strong> /api/ai/chat - AI chatbot</li>
        <li><strong>GET</strong> /api/analytics?userId=xxx - Get analytics</li>
      </ul>
    </div>
  );
}
