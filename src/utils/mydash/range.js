/*
	* range(4); // => [0, 1, 2, 3]
	* range(-4); // => [0, -1, -2, -3]
	* range(1, 5); // => [1, 2, 3, 4]
	* range(0, 20, 5); // => [0, 5, 10, 15]
	* range(0, -4, -1); // => [0, -1, -2, -3]
	* range(1, 4, 0); // => [1, 1, 1]
	* range(0); // => []
*/

function range(...params) {

    let ans = [];
    let delta;

    if (params.length === 1) {
        params[0] > 0 ? delta = 1 : delta = -1;
        let counter = 0;
        while (counter !== params[0]) {
            ans.push(counter);
            counter += delta;
        }

    } else if (params.length === 2) {
        params[1] - params[0] > 0 ? delta = 1 : delta = -1;
        let counter = params[0];
        while (counter !== params[1]) {
            ans.push(counter);
            counter += delta;
        }

    } else if (params.length === 3 || params.length === 4) {
        params[1] - params[0] > 0 ? delta = params[2] : delta = -params[2];
        let counter = params[0];
        while (counter !== params[1]) {
            ans.push(counter);
            counter += delta;
        }
    }

    if (params.length === 4){
        ans.reverse();
    }
    return ans;
}

