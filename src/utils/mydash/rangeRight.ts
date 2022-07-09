export function rangeRight(...params): number[] {

    let ans: number[] = [];
    let delta, counter: number;

    if (params.length === 1) {
        params[0] > 0 ? delta = 1 : delta = -1;
        counter = 0;
        while (counter !== params[0]) {
            ans.push(counter);
            counter += delta;
        }
        return ans.reverse();
    } else if (params.length === 2) {
        params[1] - params[0] > 0 ? delta = 1 : delta = -1;
        counter = params[0];
        while (counter !== params[1]) {
            ans.push(counter);
            counter += delta;
        }
        return ans.reverse();
    } else {
        params[1] - params[0] > 0 ? delta = params[2] : delta = -params[2];
        counter = params[0];
        while (counter !== params[1]) {
            ans.push(counter);
            counter += delta;
        }
    }
    return ans.reverse();
}
