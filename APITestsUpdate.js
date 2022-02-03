// APITestsUpdate.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test
describe('UpdatingEntityTest', ()=> {

    it('Create Entity test',() =>{
        //POST
        const entityId = 123
        cy.request({
            method: 'POST',
            url: 'https://worldentities.org/api/entities',

            body: {
                "name":"entity1",
                "entity_type":"application",
                "decription":"description of entity 1",
                "is_verified":true,
                "department_id":3
            }
        }).then((res)=>{
            cy.log(JSON.stringify(res))
            expect(res.status).to.eq(201)
            expect(res.body.data).has.property('id',entityId)
            expect(res.body.data).has.property('name','entity1')
            expect(res.body.data).has.property('entity_type','application')
            expect(res.body.data).has.property('decription','description of entity 1')
            expect(res.body.data).has.property('is_verified',true)
            expect(res.body.data).has.property('department_id',3)
        }).then((res)=>{
            //PUT
                cy.request({
                    method:'PUT',
                    url: 'https://worldentities.org/api/entities/'+entityId,

                    body: {
                        "name":"entity1",
                        "entity_type":"application",
                        "decription":"Updated description of entity 1",
                        "is_verified":true,
                        "department_id":3
                    }
                }).then((res)=>{
                    cy.log(JSON.stringify(res))
                    expect(res.status).to.eq(201)
                    expect(res.body.data).has.property('id',entityId)
                    expect(res.body.data).has.property('name','entity1')
                    expect(res.body.data).has.property('entity_type','application')
                    expect(res.body.data).has.property('decription','Updated description of entity 1')
                    expect(res.body.data).has.property('is_verified',true)
                    expect(res.body.data).has.property('department_id',3)
                }).then((res)=>{                
                //GET
                cy.request({
                    method:'GET',
                    url: 'https://worldentities.org/api/entities/'+entityId


                }).then((res)=>{
                    expect(res.status).to.eq(200)
                    expect(res.body.data).has.property('id',entityId)
                    expect(res.body.data).has.property('name','entity1')
                    expect(res.body.data).has.property('entity_type','application')
                    expect(res.body.data).has.property('decription','description')
                    expect(res.body.data).has.property('is_verified',true)
                    expect(res.body.data).has.property('department_id',3)

                }).then((res) => {
                    //DELETE
                    cy.request({
                        method:'DELETE',
                        url: 'https://worldentities.org/api/entities/'+entityId

                    }).then((res)=>{
                        expect(res.status).to.eq(204)
                    })
                })


            })
        
        })
    })
})
