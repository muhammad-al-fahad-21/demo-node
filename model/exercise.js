// POST api/returns {customerId, movieId}

    // Negative Test Cases

// Return 401 if client is not logged in
// Return 400 if customerId is not provided
// Return 400 if movieId is not provided
// Return 404 if not rental found for this customer/movie
// Return 400 if rental already processed

    // Positive Test Cases
    
// Return 200 if valid request
// Set the return date
// Calculate the rental fee
// Increase the stock
// Return the rental