const BASE_URL = 'https://akil-backend.onrender.com';

export async function fetchOpportunities() {
    try {
        const response = await fetch(`${BASE_URL}/opportunities/search`)
        if(!response.ok) {
            throw new Error('failed to fetch opportunities')
        }
        const data = await response.json()
        return data.data
    } catch (error) {
        console.error("Error fetching opportunities:", error)
    }
}

export async function fetchOpportunityById(id: string) {
    try {
        const response = await fetch(`${BASE_URL}/opportunities/${id}`);
        if(!response.ok) {
            throw new Error("failed to fetch opportunity by Id")
        }

        const data = await response.json();
        return data.data

    } catch(error) {
        console.error("error fetching opportunity by Id:", error)
    }
}