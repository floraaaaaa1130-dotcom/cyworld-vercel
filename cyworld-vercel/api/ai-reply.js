export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ reply: '안 받음ㅋ' });
  }

  try {
    const { message } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `너는 2005년 싸이월드 얼짱이야.
방명록에 "${message}"가 올라왔어.
그 시절 유행어+특수문자 섞어서
킹받지만 쿨하게 20자 이내 답글 써줘.`
            }]
          }]
        })
      }
    );

    const data = await response.json();

    const reply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text
      || "흥.. 관심 없어ㅋ";

    res.status(200).json({ reply });
  } catch (e) {
    res.status(200).json({ reply: "서버 점검중..ㅠ" });
  }
}