// Script to create admin user via API
// Run this in browser console or as a Node.js script

const API_BASE = 'https://catalyst-career-ai-backend.onrender.com/api';

async function createAdminUser() {
  try {
    // Step 1: Create user account
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

    if (signupResponse.ok) {
      const userData = await signupResponse.json();
      console.log('✅ Admin user created successfully:', userData);
      
      // Step 2: Try to login to verify
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
        console.log('✅ Login successful:', loginData);
        console.log('🎉 Admin user is ready to use!');
      } else {
        console.log('⚠️ Login failed:', await loginResponse.text());
      }
    } else {
      const errorText = await signupResponse.text();
      console.log('❌ User creation failed:', errorText);
      
      // If user already exists, try to login
      if (signupResponse.status === 400 && errorText.includes('already exists')) {
        console.log('🔄 User already exists, trying to login...');
        
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
          console.log('✅ Login successful:', loginData);
          console.log('🎉 Admin user is ready to use!');
        } else {
          console.log('❌ Login failed:', await loginResponse.text());
        }
      }
    }
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

// Run the function
createAdminUser();
