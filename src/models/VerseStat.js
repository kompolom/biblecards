/**
 * @typedef VerseStat
 * @property {number} id
 * @property {number} views
 * @property {number} right
 * @property {number} wrong
 */

export class VerseStat {

    /**
     * @param {number} verseId
     * @param {number} views
     * @param {number} rightCount
     * @param {number} wrongCount
     */
    constructor(verseId, views, rightCount, wrongCount) {
        this.id = verseId
        this.views = views
        this.right = rightCount
        this.wrong = wrongCount
    }
}