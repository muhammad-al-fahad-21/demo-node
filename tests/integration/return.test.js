const { Rental } = require('../../model/rental')
const mongoose = require('mongoose')

describe('/api/returns', () => {
    let server;
    let customerId;
    let movieId;
    let rental;

    beforeEach(async () => {
        server = require('../../index')

        customerId = new mongoose.Types.ObjectId()
        movieId = new mongoose.Types.ObjectId()

        rental = new Rental({
            customer: {
                _id: customerId,
                name: '12345',
                phone: '12345'
            },
            movie: {
                _id: movieId,
                title: 'movie title',
                dailyRentalRate: 2
            }
        })

        await rental.save()
    })

    afterEach(async () => {
        await server.close()

        await Rental.collection.deleteMany({})
    })

    it('should work', async () => {
        const result = await Rental.findOne(rental._id)

        expect(result).not.toBeNull()
    })
})