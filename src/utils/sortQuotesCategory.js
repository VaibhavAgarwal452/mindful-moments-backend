import { CATEGORIES } from "../constants.js"

export const getQuotesandSort = (quoteCategory) => {
    let arr = []
    quoteCategory.map(item => {
        arr = arr.concat(CATEGORIES[item])
    })
    arr = [...new Set(arr)]
    if (arr.length > 0) {
        return arr
    }
    return ["life", "inspirational", "faith"]
}

export const getQuotesByCategories = (quoteCategory) => {
    let arr = []
    switch (quoteCategory) {
        case "pride":
            arr = arr.concat(["success", "success-quotes"])
            break;
        case "handleFailure":
            arr = arr.concat(["failure"])
            break;
        case "wisdom":
            arr = arr.concat(["wisdom", "wisdom-quotes"])
            break;
        case "life":
            arr = arr.concat(["life-lessons", "life-quotes"])
            break;
        case "spring":
            arr = arr.concat(["soul"])
            break;
        case "friendship":
            arr = arr.concat(["friendship", "funny"])
            break;
        case "gym":
            arr = arr.concat(["strength", "pain", "power"])
            break;
        case "weekend":
            arr = arr.concat(["happiness", "humor"])
            break;
        case "bullying":
            arr = arr.concat(["confidence", "believe",])
            break;
        case "honesty":
            arr = arr.concat(["honesty", "Good"])
            break;
        case "health":
            arr = arr.concat(["health", "positivity", "growth"])
            break;
        case "uncertainty":
            arr = arr.concat(["ignorance", "journey", "light"])
            break;
        case "losingFriend":
            arr = arr.concat(["loss", "sad", "philosophy-of-life"])
            break;
        case "minimalism":
            arr = arr.concat(["mind", "mind-power", "determination"])
            break;
        case "distance":
            arr = arr.concat(["perseverance", "compassion"])
            break;
        case "selfRespect":
            arr = arr.concat(["self", "self-help", "self-improvement"])
            break;
        case "parenthood":
            arr = arr.concat(["family"])
            break;
        case "motivation":
            arr = arr.concat(["motivation", "motivational", "motivational-quotes", "self-motivation"])
            break;
        case "affirmations":
            arr = arr.concat(["lailah-gifty-akita-affirmations", "trust", "truth"])
            break;
        case "faith":
            arr = arr.concat(["faith", "faith-quotes"])
            break;
        case "love":
            arr = arr.concat(["love", "lovers", "love-quotes", "self-love"])
            break;
        case "positiveThinking":
            arr = arr.concat(["positivity", "positive-thoughts"])
            break;
        case "god":
            arr = arr.concat(["serving-god", "god"])
            break;
        case "innerPeace":
            arr = arr.concat(["peace", "inner-strength"])
            break;
        case "deep":
            arr = arr.concat(["psychology"])
            break;
        case "overthinking":
            arr = arr.concat(["desire", "hate"])
            break;
        case "death":
            arr = arr.concat(["death"])
            break;
        case "relationship":
            arr = arr.concat(["relationships", "relationship", "lovers"])
            break;
        case "depression":
            arr = arr.concat(["depression"])
            break;
        case "loneliness":
            arr = arr.concat(["loneliness", "You"])
            break;
        case "change":
            arr = arr.concat(["change"])
            break;
        case "missingSomeone":
            arr = arr.concat(["desire"])
            break;
        case "frustration":
            arr = arr.concat(["self-help", "You", "Me"])
            break;
        case "haters":
            arr = arr.concat(["hate", "evil"])
            break;
        case "heartbroken":
            arr = arr.concat(["forgiveness", "belief"])
            break;
        case "fear":
            arr = arr.concat(["fear", "healing"])
            break;
        case "breakup":
            arr = arr.concat(["lies", "healing"])
            break;
        case "strong":
            arr = arr.concat(["inner-strength", "strength", "life-philosophy"])
            break;
        case "selfEsteem":
            arr = arr.concat(["self-esteem"])
            break;
        case "development":
            arr = arr.concat(["self-improvement", "self-confidence", "self-help"])
            break;
        case "happiness":
            arr = arr.concat(["happiness", "happy"])
            break;
        case "growth":
            arr = arr.concat(["growth", "self-improvement"])
            break;
        case "selfLove":
            arr = arr.concat(["self-love"])
            break;
        case "beginnings":
            arr = arr.concat(["freedom", "positive"])
            break;
        case "gratitude":
            arr = arr.concat(["gratitude"])
            break;
        case "gratitude":
            arr = arr.concat(["gratitude"])
            break;
        case "self":
            arr = arr.concat(["self"])
            break
        case "calm":
            arr = arr.concat(["peace", "forgiveness"])
            break
        case "enjoy":
            arr = arr.concat(["happiness", "joy", "music"])
            break
        case "hope":
            arr = arr.concat(["hope", "desire"])
            break
        case "sleep":
            arr = arr.concat(["dreams", "dream"])
            break
        case "anxiety":
            arr = arr.concat(["self-esteem"])
            break
        case "patience":
            arr = arr.concat(["positive-thinking"])
            break
        case "stress":
            arr = arr.concat(["depression"])
            break
        case "smile":
            arr = arr.concat(["smile"])
            break
        case "success":
            arr = arr.concat(["success", "success-quotes"])
            break
        case "money":
            arr = arr.concat(["money"])
            break
        case "passion":
            arr = arr.concat(["passion"])
            break
        case "business":
            arr = arr.concat(["business"])
            break
        case "leadership":
            arr = arr.concat(["leadership"])
            break
        case "work":
            arr = arr.concat(["work"])
            break
        case "hustle":
            arr = arr.concat(["goals"])
            break
        case "selfDiscipline":
            arr = arr.concat(["self-improvement"])
            break
        case "perseverance":
            arr = arr.concat(["perseverance"])
            break
        case "focus":
            arr = arr.concat(["focus"])
            break
        case "kindness":
            arr = arr.concat(["kindness"])
            break
        case "funny":
            arr = arr.concat(["funny"])
            break
        case "future":
            arr = arr.concat(["future"])
            break
        case "beauty":
            arr = arr.concat(["beauty"])
            break
        case "words":
            arr = arr.concat(["encouragement"])
            break
        case "sayings":
            arr = arr.concat(["life-quotes-and-sayings", "wise-sayings"])
            break
        case "art":
            arr = arr.concat(["art"])
            break
        case "forgiveness":
            arr = arr.concat(["forgiveness"])
            break
        case "trust":
            arr = arr.concat(["trust"])
            break
        case "lies":
            arr = arr.concat(["lies"])
            break
        case "marriage":
            arr = arr.concat(["marriage"])
            break
        case "religion":
            arr = arr.concat(["religion"])
            break
        default:
            arr = arr.concat(["life"])
            break;
    }
    return arr
}
