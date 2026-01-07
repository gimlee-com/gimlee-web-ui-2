/**
 * THE "GEOMETRICON" GENERATOR
 *
 * A deterministic generative art system for user avatars.
 * Style: Abstract Geometric / Bauhaus
 */

type HSL = { h: number; s: number; l: number };

class Random {
    private seed: number;

    constructor(seed: number) {
        this.seed = seed;
    }

    // A simple seeded PRNG (Mulberry32) to ensure
    // the same username always generates the same avatar.
    next(): number {
        let t = (this.seed += 0x6d2b79f5);
        t = Math.imul(t ^ (t >>> 15), t | 1);
        t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    }

    // Helper to get range
    range(min: number, max: number): number {
        return min + this.next() * (max - min);
    }

    // Helper to pick item from array
    pick<T>(arr: T[]): T {
        return arr[Math.floor(this.next() * arr.length)];
    }
}

// 1. Hash the username into an integer seed
function simpleHash(str: string): number {
    let h = 0xdeadbeef;
    for (let i = 0; i < str.length; i++) {
        h = Math.imul(h ^ str.charCodeAt(i), 2654435761);
        h = ((h ^ (h >>> 16)) * 2246822507) ^ Math.imul(h ^ (h >>> 13), 3266489909);
    }
    return h >>> 0;
}

// 2. Generate a pleasing color palette based on the seed
function generatePalette(rng: Random, baseHue: number): string[] {
    // Strategy: Split Complementary + Analogous (Deep & Professional look)
    const saturation = rng.range(60, 90);
    const lightness = rng.range(40, 70);

    const colors: HSL[] = [
        { h: baseHue, s: saturation + 10, l: lightness + 10 }, // Base
        { h: (baseHue + 150) % 360, s: saturation - 20, l: lightness + 10 }, // Compl 1
        { h: (baseHue + 210) % 360, s: saturation, l: lightness + 30 }, // Compl 2
        { h: (baseHue + 30) % 360, s: saturation - 15, l: lightness + 40 }, // Analogous
        { h: (baseHue + 180) % 360, s: 20, l: 92 }, // Off-white highlight
    ];

    return colors.map(c => `hsl(${c.h}, ${c.s}%, ${c.l}%)`);
}

// 3. The Main Generator Function
export function generateGeometricAvatar(username: string, size = 120): string {
    const seed = simpleHash(username);
    const rng = new Random(seed);
    
    // Pick a base hue first so we can use it for the text border
    const baseHue = rng.range(0, 360);
    const colors = generatePalette(rng, baseHue);

    // Background
    const bg = colors.pop(); // Use the lightest color for BG
    let svgContent = `<rect width="${size}" height="${size}" fill="${bg}" />`;

    // Complexity control: 4 to 8 shapes
    const numShapes = Math.floor(rng.range(4, 8));

    for (let i = 0; i < numShapes; i++) {
        const color = rng.pick(colors);
        const shapeType = Math.floor(rng.range(0, 3)); // 0=Circle, 1=Rect, 2=Triangle

        // Randomize opacity for "depth"
        const opacity = rng.range(0.3, 0.9);

        // Position & Scale
        const scale = rng.range(size * 1.2, size * 1.2);
        const x = rng.range(-size * 0.1, size * 0.9);
        const y = rng.range(-size * 0.4, size * 1.3);

        // Rotation
        const rotation = rng.range(0, 360);

        let shapeTag = "";
        const transform = `translate(${x}, ${y}) rotate(${rotation} ${scale/2} ${scale/2})`;

        if (shapeType === 0) {
            // Circle
            const r = scale / 2;
            shapeTag = `<circle cx="${r}" cy="${r}" r="${r}" fill="${color}" fill-opacity="${opacity}" transform="${transform}" />`;
        } else if (shapeType === 1) {
            // Rectangle (sometimes rounded)
            const rx = rng.range(0, scale * 0.3);
            shapeTag = `<rect width="${scale}" height="${scale}" rx="${rx}" fill="${color}" fill-opacity="${opacity}" transform="${transform}" />`;
        } else {
            // Triangle (Polygon)
            const p1 = `${scale / 2},0`;
            const p2 = `${scale},${scale}`;
            const p3 = `0,${scale}`;
            shapeTag = `<polygon points="${p1} ${p2} ${p3}" fill="${color}" fill-opacity="${opacity}" transform="${transform}" />`;
        }

        svgContent += shapeTag;
    }

    // Overlay: First character of the username
    const char = username.charAt(0).toUpperCase();
    const borderColor = `hsl(${baseHue}, 80%, 37%)`; // Darkened base hue

    svgContent += `
        <text 
            x="50%" 
            y="50%" 
            dy=".1em"
            text-anchor="middle" 
            dominant-baseline="middle" 
            font-family="sans-serif" 
            font-size="${size * 0.7}" 
            font-weight="bold" 
            fill="#ffffff" 
            stroke="${borderColor}" 
            stroke-width="${size * 0.02}"
            paint-order="stroke"
        >
            ${char}
        </text>
    `;

    // 4. Return the full SVG string
    return `
    <svg 
      viewBox="0 0 ${size} ${size}" 
      xmlns="http://www.w3.org/2000/svg"
      style="border-radius: 50%; overflow: hidden;"
    >
      ${svgContent}
    </svg>
  `.trim();
}