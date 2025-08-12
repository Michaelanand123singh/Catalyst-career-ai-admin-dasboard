// Reset Admin User Password Script
// Run this in your admin dashboard console

const API_BASE = 'https://catalyst-career-ai-backend.onrender.com/api';

async function resetAdminPassword() {
  console.log('🔧 Resetting admin user password...');
  console.log('=' .repeat(50));
  
  try {
    // Step 1: Try to create a new user with different email first
    console.log('1️⃣ Testing with different email...');
    const testSignupResponse = await fetch(`${API_BASE}/auth/signup`, {
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
    
    console.log('   Test signup status:', testSignupResponse.status);
    const testSignupData = await testSignupResponse.text();
    console.log('   Test signup response:', testSignupData);
    
    if (testSignupResponse.ok) {
      console.log('✅ Test user created successfully - signup endpoint works!');
      
      // Step 2: Now try to create admin user with different password
      console.log('\n2️⃣ Creating admin user with new password...');
      const adminSignupResponse = await fetch(`${API_BASE}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: 'Anand Singh',
          email: 'admin@catalystcareers.in', // Different email
          password: 'Admin@123' // New password
        })
      });
      
      console.log('   Admin signup status:', adminSignupResponse.status);
      const adminSignupData = await adminSignupResponse.text();
      console.log('   Admin signup response:', adminSignupData);
      
      if (adminSignupResponse.ok) {
        console.log('✅ New admin user created!');
        console.log('📧 Email: admin@catalystcareers.in');
        console.log('🔐 Password: Admin@123');
        
        // Step 3: Test login with new credentials
        console.log('\n3️⃣ Testing login with new admin credentials...');
        const loginResponse = await fetch(`${API_BASE}/auth/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: 'admin@catalystcareers.in',
            password: 'Admin@123'
          })
        });
        
        if (loginResponse.ok) {
          const loginData = await loginResponse.json();
          console.log('✅ Login successful with new admin user!');
          console.log('🔑 Token received:', loginData.token ? 'Yes' : 'No');
          console.log('🎉 You can now login to your admin dashboard!');
          console.log('\n📋 New Admin Credentials:');
          console.log('   Email: admin@catalystcareers.in');
          console.log('   Password: Admin@123');
        } else {
          console.log('❌ Login failed with new credentials');
        }
      }
    } else {
      console.log('❌ Test signup failed - there might be a backend issue');
    }
    
  } catch (error) {
    console.error('❌ Error during password reset:', error);
  }
}

// Run the reset function
resetAdminPassword();
