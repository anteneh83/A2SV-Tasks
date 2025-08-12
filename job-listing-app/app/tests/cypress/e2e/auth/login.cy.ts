describe("Login Page", ()=> {
    beforeEach(()=>{
        cy.visit("/auth/login")
    });

    it("renders the login page correctly", ()=> {
        cy.contains("Welcome Back,").should("exist")
        cy.get("input#email").should("exist")
        cy.get("input#password").should("exist")
        cy.get("button[type='submit']").should("contain", "Login")
    })

    it("shows validation error when field are empty", ()=>{
        cy.get("button[type='submit']").click()
        cy.url().should("include", "auth/login")
    })

    it("show error for invalid credentials", ()=> {
        cy.get("input#email").type("wrong@example.com")
        cy.get("input#password").type("123456")
        cy.get("button[type='submit']").click()


        cy.contains("Invalid Email or Password").should("exist")
    })

    it("login successfully with valid credentials", ()=>{
        cy.get("input#email").type("antenehgetnet83@gmail.com")
        cy.get("input#password").type("123456")
        cy.get("button[type='submit']").click()


        cy.url().should("include", "/dashboard/jobs")

    })

}
)