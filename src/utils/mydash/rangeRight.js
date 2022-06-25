function range(...params){

    let ans = [];

    if (params.length === 1){
        let delta;
        params[0] > 0 ? delta = 1 : delta = -1;
        let counter = 0;
        while(counter !== params[0]){
            ans.push(counter);
            counter += delta;
        }
        return ans.reverse();
    }

    else if (params.length === 2){
        let delta;
        params[1] - params[0] > 0 ? delta = 1 : delta = -1;
        let counter = params[0];
        while(counter !== params[1]){
            ans.push(counter);
            counter += delta;
        }
        return ans.reverse();
    }

    else {
        let delta;
        params[1] - params[0] > 0 ? delta = params[2] : delta = -params[2];
        let counter = params[0];
        while(counter !== params[1]){
            ans.push(counter);
            counter += delta;
        }
    }
    return ans.reverse();
}
