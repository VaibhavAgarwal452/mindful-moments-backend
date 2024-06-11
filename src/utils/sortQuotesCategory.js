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
