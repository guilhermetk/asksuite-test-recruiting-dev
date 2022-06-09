const formatDate = (date) =>{
    if(!date) return;
    return date.split('/').join('');
}

module.exports = {
    formatDate
};