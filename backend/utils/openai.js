import "dotenv/config";

const getOpenAi = async(messages) =>{
    const options = {
    method: "POST",
    headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        "model": "nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free",
        "messages": [
        {
            "role": "user",
            "content": messages
        }
        ],
    })
    }

    
    try{
        let response = await fetch("https://openrouter.ai/api/v1/chat/completions", options);
        let result = await response.json();
        return result.choices[0].message.content;
    }catch(err){
        console.log(err);
    }
}

export default getOpenAi;