// Comprehensive Backend Debugging Script
// Run this in your admin dashboard console at https://admin.catalystcareers.in/

const API_BASE = 'https://catalyst-career-ai-backend.onrender.com/api';

async function debugBackend() {
  console.log('🔍 Starting comprehensive backend debug...');
  console.log('=' .repeat(50));
  
  try {
    // Test 1: Basic connectivity
    console.log('1️⃣ Testing basic connectivity...');
    const rootResponse = await fetch('https://catalyst-career-ai-backend.onrender.com/');
    console.log('   Root status:', rootResponse.status);
    const rootData = await rootResponse.text();
    console.log('   Root response:', rootData.substring(0, 200) + '...');
    
    // Test 2: Health endpoint
    console.log('\n2️⃣ Testing health endpoint...');
    const healthResponse = await fetch(`${API_BASE}/health`);
    console.log('   Health status:', healthResponse.status);
    const healthData = await healthResponse.text();
    console.log('   Health response:', healthData);
    
    // Test 3: System status
    console.log('\n3️⃣ Testing system status...');
    const statusResponse = await fetch(`${API_BASE}/system-status`);
    console.log('   Status endpoint status:', statusResponse.status);
    const statusData = await statusResponse.text();
    console.log('   Status response:', statusData);
    
    // Test 4: Try to get current user (should fail without auth)
    console.log('\n4️⃣ Testing auth endpoint (should fail without token)...');
    const meResponse = await fetch(`${API_BASE}/auth/me`);
    console.log('   Auth me status:', meResponse.status);
    const meData = await meResponse.text();
    console.log('   Auth me response:', meData);
    
    // Test 5: Test signup with detailed error
    console.log('\n5️⃣ Testing signup endpoint...');
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
    console.log('   Signup headers:', Object.fromEntries(signupResponse.headers.entries()));
    
    const signupData = await signupResponse.text();
    console.log('   Signup response:', signupData);
    
    // Test 6: Try different signup data
    console.log('\n6️⃣ Testing signup with different data...');
    const signup2Response = await fetch(`${API_BASE}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'Test User',
        email: 'test@example.com',
        password: 'testpass123'
      })
    });
    
    console.log('   Signup2 status:', signup2Response.status);
    const signup2Data = await signup2Response.text();
    console.log('   Signup2 response:', signup2Data);
    
    console.log('\n✅ Debug complete! Check the output above.');
    
  } catch (error) {
    console.error('❌ Debug error:', error);
  }
}

// Run the debug function
debugBackend();
