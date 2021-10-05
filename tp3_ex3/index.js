import fs from 'fs'
let list
let tree = {
    p0 : {id:'0', nodes:[]}
}
let newTree = {}

function child(root, nodes) {
    for(let i in nodes){
        if(tree[nodes[i]].nodes.length){
            root.nodes.push({id:tree[nodes[i]].id, nodes :[]})
            child(root.nodes[i],tree[nodes[i]].nodes)
        }else{root.nodes.push({id:tree[nodes[i]].id})}
    }
}
fs.readFile('./e5.csv', 'utf8' , (err, data) => {
    if (err) {
      console.error(err)
      return
    }
    const headers = ["id","parent"]
    const rows = data.slice(data.indexOf("\n") + 1).split("\n");
    list = rows.map(function (row) {
        const values = row.split(",");
        const addData = headers.reduce(function (object, header, index) {
            object[header] = values[index];
            return object;
        }, {});
        return addData;
    });
    
    for(let i=1; i < list.length; i++ ){
        let pi = "p"+i

        tree[pi]={id:list[i].id, nodes:[]}
        for(let j in tree){
            j=j.substring(1)
            if(j === list[i].parent){
                let pj = "p"+j
                tree[pj].nodes.push(pi)
            }
        }
    }
    console.log(tree.p0.id)
    newTree.id = tree.p0.id
    newTree.nodes =[]
    child(newTree, tree.p0.nodes)
    newTree = JSON.stringify(newTree)
    fs.writeFileSync('./e5.json',newTree)
})
 


