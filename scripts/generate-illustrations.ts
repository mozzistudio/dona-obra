/**
 * Batch illustration generator for Doña Obra marketing site.
 * Uses Gemini API via the /api/generate-illustration endpoint.
 *
 * Usage: npx tsx scripts/generate-illustrations.ts
 *
 * Make sure the dev server is running on port 3002 first.
 */

const BASE_URL = 'http://localhost:3002/api/generate-illustration';

const STYLE_PREFIX =
  'Flat illustration style, warm earthy tones (coral #E8614D, sand #FFF5EB, jungle green #2D5F4A), ' +
  'clean simple vector look, friendly and approachable, Panama/Latin American cultural feel, ' +
  'no text in the image, suitable for a website section illustration. ';

const illustrations = [
  {
    filename: 'hero',
    prompt:
      STYLE_PREFIX +
      'A friendly Panamanian woman wearing a hardhat gives a thumbs up while standing next to a cozy home. ' +
      'Tools and home repair elements float around her. Warm inviting scene showing trust and expertise.',
  },
  {
    filename: 'step-describe',
    prompt:
      STYLE_PREFIX +
      'A person typing on their phone, with a speech bubble showing a leaking pipe illustration. ' +
      'Chat interface concept showing someone describing their home problem in a messaging app.',
  },
  {
    filename: 'step-estimate',
    prompt:
      STYLE_PREFIX +
      'A price tag or estimate card floating above a phone screen, showing dollar signs and a checkmark. ' +
      'Concept of receiving a quick fair price estimate for home services.',
  },
  {
    filename: 'step-choose',
    prompt:
      STYLE_PREFIX +
      'Three professional workers standing in a row - a plumber, electrician, and painter - with star ratings above them. ' +
      'Concept of choosing from verified professionals.',
  },
  {
    filename: 'cat-plomeria',
    prompt:
      STYLE_PREFIX +
      'A friendly plumber fixing a kitchen sink pipe with a wrench. Water droplets, pipes and plumbing tools visible.',
  },
  {
    filename: 'cat-electricidad',
    prompt:
      STYLE_PREFIX +
      'An electrician working on a wall outlet with a voltmeter. Lightning bolts, wires and electrical symbols around.',
  },
  {
    filename: 'cat-pintura',
    prompt:
      STYLE_PREFIX +
      'A painter with a roller painting a wall in coral and cream colors. Paint cans, brushes and color swatches around.',
  },
  {
    filename: 'cat-limpieza',
    prompt:
      STYLE_PREFIX +
      'A cleaning professional with mop and bucket in a sparkling clean living room. Cleaning supplies and sparkle effects.',
  },
  {
    filename: 'cat-aire-acondicionado',
    prompt:
      STYLE_PREFIX +
      'A technician servicing an air conditioning unit on a wall. Snowflakes, cool breeze lines and tools visible.',
  },
  {
    filename: 'cat-cerrajeria',
    prompt:
      STYLE_PREFIX +
      'A locksmith working on a front door lock with specialized tools. Keys, padlocks and security elements.',
  },
  {
    filename: 'cat-jardineria',
    prompt:
      STYLE_PREFIX +
      'A gardener tending to a lush tropical garden with plants and flowers. Pruning shears, watering can and green leaves.',
  },
  {
    filename: 'cat-albanileria',
    prompt:
      STYLE_PREFIX +
      'A mason building a brick wall with a trowel. Bricks, cement and construction elements in a home setting.',
  },
  {
    filename: 'cat-mudanzas',
    prompt:
      STYLE_PREFIX +
      'Movers carrying boxes into a moving truck. Furniture, cardboard boxes and a new home in the background.',
  },
  {
    filename: 'cat-electrodomesticos',
    prompt:
      STYLE_PREFIX +
      'A technician repairing a washing machine with tools. Home appliances like fridge, microwave visible in background.',
  },
  {
    filename: 'trust',
    prompt:
      STYLE_PREFIX +
      'A shield with a checkmark surrounded by happy homes and satisfied families. Trust and verification concept.',
  },
  {
    filename: 'about',
    prompt:
      STYLE_PREFIX +
      'A warm scene of a Panamanian neighborhood with colorful houses, palm trees and people helping each other with home repairs. Community and trust concept.',
  },
];

async function generateOne(item: { filename: string; prompt: string }) {
  console.log(`🎨 Generating: ${item.filename}...`);
  const start = Date.now();

  try {
    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item),
    });

    const data = await res.json();

    if (data.success) {
      const elapsed = ((Date.now() - start) / 1000).toFixed(1);
      console.log(`  ✅ ${item.filename} → ${data.path} (${(data.size / 1024).toFixed(0)}KB, ${elapsed}s)`);
      return true;
    } else {
      console.error(`  ❌ ${item.filename}: ${data.error}`);
      if (data.details) console.error(`     ${data.details.substring(0, 200)}`);
      return false;
    }
  } catch (err) {
    console.error(`  ❌ ${item.filename}: ${err}`);
    return false;
  }
}

async function main() {
  console.log(`\n🖼️  Doña Obra Illustration Generator`);
  console.log(`   ${illustrations.length} illustrations to generate\n`);

  let success = 0;
  let fail = 0;

  // Generate sequentially to avoid rate limits
  for (const item of illustrations) {
    const ok = await generateOne(item);
    if (ok) success++;
    else fail++;

    // Small delay between requests
    await new Promise((r) => setTimeout(r, 2000));
  }

  console.log(`\n📊 Done! ${success} succeeded, ${fail} failed.\n`);
}

main();
