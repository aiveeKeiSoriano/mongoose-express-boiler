const supertest = require("supertest")
const app = require("./app")
const request = supertest(app)

beforeAll(() => {})

describe("Async Sample", () => {
    it("Sample", async () => {
        const res = request.post('/').send({
            //stuff
        })
        expect(1).toBe(1)
    })
})

describe("Sync Sample", () => {
    it("Sample", () => {
        expect(1).toBe(1)
    })
})


afterAll(() => {})