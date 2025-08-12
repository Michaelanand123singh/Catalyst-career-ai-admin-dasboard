// Fix Admin User Creation Script
// Run this in your admin dashboard console at https://admin.catalystcareers.in/

const API_BASE = 'https://catalyst-career-ai-backend.onrender.com/api';

async function fixAdminUser() {
  console.log('🔧 Fixing admin user creation...');
  console.log('=' .repeat(50));
  
  try {
    // Step 1: Check if user already exists by trying to login
    console.log('1️⃣ Checking if admin user exists...');
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
    
    if (loginResponse.ok) {
      const loginData = await loginResponse.json();
      console.log('✅ Admin user already exists and login works!');
      console.log('🔑 Token received:', loginData.token ? 'Yes' : 'No');
      console.log('👤 User data:', loginData.user);
      console.log('🎉 You can now login to your admin dashboard!');
      return;
    }
    
    console.log('❌ Login failed, user does not exist. Creating...');
    
    // Step 2: Try to create the user with different approaches
    const signupAttempts = [
      // Attempt 1: Basic signup
      {
        name: 'Anand Singh',
        email: 'theanandsingh76@gmail.com',
        password: 'Password@#123'
      },
      // Attempt 2: With different password format
      {
        name: 'Anand Singh',
        email: 'theanandsingh76@gmail.com',
        password: 'Password123!'
      },
      // Attempt 3: With additional fields if needed
      {
        name: 'Anand Singh',
        email: 'theanandsingh76@gmail.com',
        password: 'Password@#123',
        role: 'admin'
      }
    ];
    
    for (let i = 0; i < signupAttempts.length; i++) {
      console.log(`\n2️⃣ Attempt ${i + 1}: Trying signup with data:`, signupAttempts[i]);
      
      const signupResponse = await fetch(`${API_BASE}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(signupAttempts[i])
      });
      
      console.log(`   Status: ${signupResponse.status}`);
      const responseText = await signupResponse.text();
      console.log(`   Response: ${responseText}`);
      
      if (signupResponse.ok) {
        console.log('✅ User created successfully!');
        
        // Step 3: Verify by logging in
        console.log('\n3️⃣ Verifying login...');
        const verifyLoginResponse = await fetch(`${API_BASE}/auth/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: 'theanandsingh76@gmail.com',
            password: signupAttempts[i].password
          })
        });
        
        if (verifyLoginResponse.ok) {
          const verifyData = await verifyLoginResponse.json();
          console.log('✅ Login verification successful!');
          console.log('🔑 Admin user is ready to use!');
          console.log('📧 Email: theanandsingh76@gmail.com');
          console.log('🔐 Password:', signupAttempts[i].password);
          console.log('🎉 You can now login to your admin dashboard!');
          return;
        } else {
          console.log('⚠️ Login verification failed');
        }
        break;
      } else if (signupResponse.status === 400 && responseText.includes('already exists')) {
        console.log('🔄 User already exists, trying to login...');
        
        // Try to login with the current password
        const existingLoginResponse = await fetch(`${API_BASE}/auth/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: 'theanandsingh76@gmail.com',
            password: signupAttempts[i].password
          })
        });
        
        if (existingLoginResponse.ok) {
          const existingData = await existingLoginResponse.json();
          console.log('✅ Login successful with existing user!');
          console.log('🔑 Admin user is ready to use!');
          console.log('📧 Email: theanandsingh76@gmail.com');
          console.log('🔐 Password:', signupAttempts[i].password);
          console.log('🎉 You can now login to your admin dashboard!');
          return;
        }
      }
    }
    
    console.log('\n❌ All signup attempts failed. Check the error messages above.');
    console.log('💡 You may need to check your backend logs or database configuration.');
    
  } catch (error) {
    console.error('❌ Error during admin user creation:', error);
  }
}

// Run the fix function
fixAdminUser();
