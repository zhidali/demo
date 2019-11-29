module.exports = function (playerAction) {
    let random = Math.random() * 3;
    let diann
    if (random < 1) {
        diann = 'shitou'
    } else if (random > 1 && random < 2) {
        diann = 'jiandao'
    } else {
        diann = 'bu'
    }

    if (playerAction === diann) {
        console.log('平局');
        return 0
    } else if (
        (playerAction === 'shitou' && diann === 'jiandao') ||
        (playerAction === 'jiandao' && diann === 'bu') ||
        (playerAction === 'bu' && diann === 'shitou')
    ) {
        console.log('赢了');
        return 1
    } else {
        console.log('输了');
        return -1
    }
}