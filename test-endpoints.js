// Test the correct API endpoints
// Run this in your admin dashboard console

const API_BASE = 'https://catalyst-career-ai-backend.onrender.com/api';

async function testCorrectEndpoints() {
  console.log('🧪 Testing correct API endpoints...');
  console.log('=' .repeat(50));
  
  try {
    // Test 1: Root endpoint
    console.log('1️⃣ Testing root endpoint...');
    const rootResponse = await fetch('https://catalyst-career-ai-backend.onrender.com/');
    console.log('   Root status:', rootResponse.status);
    
    // Test 2: Health endpoint
    console.log('\n2️⃣ Testing health endpoint...');
    const healthResponse = await fetch(`${API_BASE}/health`);
    console.log('   Health status:', healthResponse.status);
    const healthData = await healthResponse.text();
    console.log('   Health response:', healthData);
    
    // Test 3: Auth signup endpoint (correct path)
    console.log('\n3️⃣ Testing auth signup endpoint...');
    const signupResponse = await fetch(`${API_BASE}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'Anand Singh',
        email: 'theanandsingh76@gmail.com',
        password: 'Password@#123'
      })
    });
    
    console.log('   Signup status:', signupResponse.status);
    const signupData = await signupResponse.text();
    console.log('   Signup response:', signupData);
    
    // Test 4: Auth login endpoint (correct path)
    console.log('\n4️⃣ Testing auth login endpoint...');
    const loginResponse = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'theanandsingh76@gmail.com',
        password: 'Password@#123'
      })
    });
    
    console.log('   Login status:', loginResponse.status);
    const loginData = await loginResponse.text();
    console.log('   Login response:', loginData);
    
    console.log('\n✅ Endpoint test complete!');
    
  } catch (error) {
    console.error('❌ Test error:', error);
  }
}

// Run the test
testCorrectEndpoints();
