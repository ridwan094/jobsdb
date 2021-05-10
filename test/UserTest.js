import server from '../server/server'
import chai from 'chai'
import chaiHttp from 'chai-http'

// Assertion
chai.should();
chai.use(chaiHttp);

describe('user APIs', () => {
    // get all users
    describe("Test GET route /api/users", () => {

        it("It should return all users", (done) => {
           
            chai.request(server)
                .get("/api/users/")
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('array');
                    response.body.length.should.not.be.eq(0);
                    done();
                });

        });

        // negative test
        it("It should not return all users", (done) => {
            chai.request(server)
                .get("/api/use/")
                .end((err, response) => {
                    response.should.have.status(404);
                    done();
                });
        });

    });

    // end get all users

    // find all user by user_id
    describe("GET /api/users/:id", () => {
        it("It should GET a users by ID", (done) => {
            const userId = 2;
            chai.request(server)
                .get("/api/users/" + userId)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('user_id');
                    response.body.should.have.property('user_name');
                    response.body.should.have.property('user_email');
                    response.body.should.have.property('user_password');
                    response.body.should.have.property('user_type');
                    response.body.should.have.property('user_id').eq(2);
                    done();
                });
        });

        it("It should NOT GET a users by ID", (done) => {
            const userId = 123;
            chai.request(server)
                .get("/api/users" + userId)
                .end((err, response) => {
                    response.should.have.status(404);
                    response.text.should.be.contains("html")
                    done();
                });
        });

    });

      /**
     * Test the POST route
     */
       describe("POST /api/users", () => {
        it("It should POST a new users", (done) => {
            const user = {
                user_name: "Bambang"
            };
            chai.request(server)                
                .post("/api/users/")
                .send(user)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('user_name').eq("Bambang");
                done();
                });
        });

        /* it("It should NOT POST a new region without the name property", (done) => {
            const region = {
                region_name :undefined
            };
            chai.request(server)                
                .post("/api/regions")
                .send(region)
                .end((err, response) => {
                    response.should.have.status(400);
                    response.text.should.be.eq("The name should be at least 3 chars long!");
                done();
                });
        }); */

    });


    /**
     * Test the PUT route
     */
     describe("PUT /api/users/:id", () => {
        it("It should PUT an existing users", (done) => {
            const userId = 1;
            const user = {
                user_name: "user 1 changed"
            };
            chai.request(server)                
                .put("/api/users/" + userId)
                .send(user)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('user_id').eq(18);
                    response.body.should.have.property('user_name').eq("user 1 changed");
                done();
                });
        });

        it("It should NOT PUT an existing user with a name with less than 3 characters", (done) => {
            const userId = 1;
            const user = {
                user_name: "Ng"
            };
            chai.request(server)                
                .put("/api/users/" + userId)
                .send(user)
                .end((err, response) => {
                    response.should.have.status(400);
                    response.text.should.be.eq("The name should be at least 3 chars long!");
                done();
                });
        });        
    });
    

    /**
     * Test the PATCH route
     */

    describe("PATCH /api/users/:id", () => {
        it("It should PATCH an existing user", (done) => {
            const userId = 1;
            const user = {
                user_name: "user 1 patch"
            };
            chai.request(server)                
                .patch("/api/users/" + userId)
                .send(user)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('user_id').eq(18);
                    response.body.should.have.property('user_name').eq("user 1 patch");
                done();
                });
        });

        it("It should NOT PATCH an existing user with a name with less than 3 characters", (done) => {
            const userId = 16;
            const user = {
                name: "Anjiiiiiing"
            };
            chai.request(server)                
                .patch("/api/users/" + userId)
                .send(user)
                .end((err, response) => {
                    response.should.have.status(400);
                    response.text.should.be.eq("The name should be at least 3 chars long!");
                done();
                });
        });        
    });
    

    /**
     * Test the DELETE route
     */
    describe("DELETE /api/users/:id", () => {
        it("It should DELETE an existing user", (done) => {
            const userId = 16;
            chai.request(server)                
                .delete("/api/users/" + userId)
                .end((err, response) => {
                    response.should.have.status(200);
                done();
                });
        });

        it("It should NOT DELETE a user that is not in the database", (done) => {
            const userId = 145;
            chai.request(server)                
                .delete("/api/users/" + userId)
                .end((err, response) => {
                    response.should.have.status(404);
                    response.text.should.be.eq("The user with the provided ID does not exist.");
                done();
                });
        });

    });
});
