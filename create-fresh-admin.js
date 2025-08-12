// Create Fresh Admin User Script
// Run this in your admin dashboard console

const API_BASE = 'https://catalyst-career-ai-backend.onrender.com/api';

async function createFreshAdmin() {
  console.log('🚀 Creating fresh admin user...');
  console.log('=' .repeat(50));
  
  try {
    // Generate unique timestamp-based emails
    const timestamp = Date.now();
    const testEmail = `test${timestamp}@example.com`;
    const adminEmail = `admin${timestamp}@catalystcareers.in`;
    
    console.log('📧 Using unique emails:');
    console.log(`   Test: ${testEmail}`);
    console.log(`   Admin: ${adminEmail}`);
    
    // Step 1: Test with unique email
    console.log('\n1️⃣ Testing signup with unique email...');
    const testSignupResponse = await fetch(`${API_BASE}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'Test User',
        email: testEmail,
        password: 'testpass123'
      })
    });
    
    console.log('   Test signup status:', testSignupResponse.status);
    const testSignupData = await testSignupResponse.text();
    console.log('   Test signup response:', testSignupData);
    
    if (testSignupResponse.ok) {
      console.log('✅ Test user created successfully!');
      
      // Step 2: Create admin user with unique email
      console.log('\n2️⃣ Creating admin user...');
      const adminSignupResponse = await fetch(`${API_BASE}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: 'Anand Singh',
          email: adminEmail,
          password: 'Admin@123'
        })
      });
      
      console.log('   Admin signup status:', adminSignupResponse.status);
      const adminSignupData = await adminSignupResponse.text();
      console.log('   Admin signup response:', adminSignupData);
      
      if (adminSignupResponse.ok) {
        console.log('✅ Admin user created successfully!');
        
        // Step 3: Test login with new admin credentials
        console.log('\n3️⃣ Testing admin login...');
        const loginResponse = await fetch(`${API_BASE}/auth/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: adminEmail,
            password: 'Admin@123'
          })
        });
        
        if (loginResponse.ok) {
          const loginData = await loginResponse.json();
          console.log('✅ Login successful!');
          console.log('🔑 Token received:', loginData.token ? 'Yes' : 'No');
          console.log('🎉 Admin access granted!');
          
          console.log('\n📋 Your New Admin Credentials:');
          console.log(`   Email: ${adminEmail}`);
          console.log('   Password: Admin@123');
          console.log('\n💡 Copy these credentials and use them to login!');
          
          // Store credentials in localStorage for easy access
          localStorage.setItem('newAdminEmail', adminEmail);
          localStorage.setItem('newAdminPassword', 'Admin@123');
          
        } else {
          console.log('❌ Login failed');
          const loginError = await loginResponse.text();
          console.log('   Error:', loginError);
        }
      } else {
        console.log('❌ Admin user creation failed');
        console.log('   Error:', adminSignupData);
      }
    } else {
      console.log('❌ Test user creation failed');
      console.log('   Error:', testSignupData);
    }
    
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

// Run the function
createFreshAdmin();
