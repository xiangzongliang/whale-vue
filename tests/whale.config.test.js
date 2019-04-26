let utils = require('../core/utils'),
    colors = require('colors')


colors.setTheme({
    info:['bgGreen','white','bold'],
    wan: ['bgYellow','white','bold'],
    bug: ['bgBlue','white','bold'],
    err: ['bgRed','white','bold']
});


/**
 * 常用API
 * .toBeGreaterThan(number)
 */

describe('test utils.js',()=>{
    test('number of threads opened > 0', () => {
        expect(utils.open_thread).toBeGreaterThan(0); //大于0
    });







    test.each([[1, 1, 2], [1, 2, 3], [2, 1, 3]])('loop test',(a, b, c) => {
        expect(a + b).toBe(c);
    });
})



//暂时不用的测试
describe.skip('not test block',()=>{
    
})


afterAll(()=>{
    console.info(` all tests completed ...  `.info);
},10*1000)




