module.exports = {
    afterCreate(event){
        const {result, params} = event;
        console.log('Device created');
    },

    afterUpdate(event){
        const {result, params} = event;
        console.log('Device updated');
    }
    
}