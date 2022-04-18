const mongoose = require('mongoose')
const Post = require('./models/post')

mongoose.connect('mongodb+srv://admin:e49KwBxT8CEnpOTp@formtest.celq4.mongodb.net/formMERN?retryWrites=true&w=majority',
    {
      useNewURLParser: true,
      useUnifiedTopology: true
    })
    .then(() => {
      console.log("Database Connected!")
    })
    .catch(err => {
      console.log("Database has failed to connect.")
      console.log(err)
    })

const seedData = [
{name:"Barbie",title:"Tango",body:"Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.\n\nCras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit."},
{name:"Bernice",title:"Sign of Four, The",body:"Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.\n\nDuis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit."},
{name:"Arabelle",title:"Stoned",body:"Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.\n\nCurabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est."},
{name:"Felicdad",title:"Killing of America, The",body:"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus. Praesent lectus."},
{name:"Graham",title:"Oranges",body:"Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.\n\nPraesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede."},
{name:"Gregorius",title:"Counter Investigation (Contre-enquête)",body:"In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.\n\nAliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.\n\nSed ante. Vivamus tortor. Duis mattis egestas metus."},
{name:"Cilka",title:"Entity, The",body:"In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.\n\nMaecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui."},
{name:"Trudy",title:"Crossing Guard, The",body:"Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.\n\nDuis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus."},
{name:"Shadow",title:"Babysitter, The",body:"Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem."},
{name:"Carlin",title:"Underground Comedy Movie, The",body:"Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.\n\nMorbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis."},
{name:"Robinetta",title:"Fires Were Started",body:"Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris."},
{name:"Lalo",title:"Jour se lève, Le (Daybreak)",body:"Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.\n\nIn hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo."},
{name:"Findlay",title:"Employee of the Month",body:"Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.\n\nInteger tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat."},
{name:"Walker",title:"Jury Duty",body:"Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.\n\nCras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.\n\nQuisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus."},
{name:"Nellie",title:"Alaska: Silence & Solitude",body:"Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.\n\nInteger tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat."},
{name:"Jethro",title:"Monuments Men, The",body:"Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.\n\nQuisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus."},
{name:"Constance",title:"Cool Runnings",body:"In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus."},
{name:"Kristi",title:"Return of the Magnificent Seven, The (a.k.a. Return of the Seven)",body:"In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.\n\nSuspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.\n\nMaecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat."},
{name:"Abelard",title:"Mulan",body:"Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.\n\nMaecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti."},
{name:"Thane",title:"Can I Do It 'Till I Need Glasses?",body:"Phasellus in felis. Donec semper sapien a libero. Nam dui."},
{name:"Taryn",title:"Birders: The Central Park Effect (Central Park Effect, The)",body:"Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit."},
{name:"Judith",title:"Miehen tie",body:"Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.\n\nMorbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.\n\nFusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem."},
{name:"Madella",title:"Melody Time",body:"In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus."},
{name:"Brucie",title:"Dolemite",body:"Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.\n\nAenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.\n\nCurabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est."},
{name:"Arney",title:"Alice Doesn't Live Here Anymore",body:"Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.\n\nVestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat."},
]

Post.insertMany(seedData)
  .then(res => {
  console.log(res)
  })
  .catch(e => {
  console.log(e)
})