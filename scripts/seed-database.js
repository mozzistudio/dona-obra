const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Load environment variables
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function seedDatabase() {
  console.log('🌱 Starting database seed...\n');

  try {
    // Read the seed SQL file
    const seedSQL = fs.readFileSync(
      path.join(__dirname, '../supabase/seed.sql'),
      'utf-8'
    );

    // Execute the SQL
    const { data, error } = await supabase.rpc('exec_sql', { sql: seedSQL });

    if (error) {
      // If RPC doesn't exist, we'll use the REST API approach
      console.log('⚠️  Direct SQL execution not available. Please copy-paste the seed.sql file into Supabase SQL Editor.');
      console.log('📍 File location: supabase/seed.sql');
      console.log('🔗 Supabase SQL Editor: https://supabase.com/dashboard/project/qzfioaiafroyxpcsrupf/sql/new');
      return;
    }

    console.log('✅ Database seeded successfully!');
    console.log('📊 Inserted:');
    console.log('   - 15 providers');
    console.log('   - 45+ reviews');
  } catch (error) {
    console.error('❌ Error seeding database:', error.message);
    console.log('\n📝 Manual approach:');
    console.log('1. Open: supabase/seed.sql');
    console.log('2. Copy all content');
    console.log('3. Paste in Supabase SQL Editor');
    console.log('4. Click RUN');
  }
}

seedDatabase();
