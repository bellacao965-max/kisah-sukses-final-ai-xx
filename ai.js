
export async function askAI(prompt) {
    const r = await fetch('/ai/groq', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
    });
    return await r.json();
}
