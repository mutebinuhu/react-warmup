import { Client, Databases, ID, Query } from "appwrite";

const APPWRITE_API_URL =  import.meta.env.VITE_APPWRITE_ENDPOINT;
const APPWRITE_PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;  
const APPWRITE_DATABASE_ID = import.meta.env.VITE_APPWRITE_DB_ID;
const APPWRITE_COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;

const client = new Client();
client
    .setEndpoint(APPWRITE_API_URL) // Your API Endpoint
    .setProject(APPWRITE_PROJECT_ID); // Your project ID

const database = new Databases(client);

export const updateSearch = async(searchTerm, movie)=>{
    //Todos
    //use Appwrite SDK to check if the document has been searched Before
    //if not, create a new document with the search term and count as 1
    //if it has been searched before, update the count by 1
    
    console.log("updateSearch")
    console.log("updateSearch")
    console.log(APPWRITE_API_URL, APPWRITE_PROJECT_ID, APPWRITE_DATABASE_ID, APPWRITE_COLLECTION_ID);

    try {
        const results = await database.listDocuments(APPWRITE_DATABASE_ID, APPWRITE_COLLECTION_ID, [
            Query.equal('searchTerm', searchTerm)
        ]);

        if(results.documents.length > 0) {
            // Document exists, update the count
            const documentId = results.documents[0].$id;
            console.log("Document ID:", results);
            const updatedDocument = await database.updateDocument(
                APPWRITE_DATABASE_ID,
                APPWRITE_COLLECTION_ID,
                documentId,
                {
                    count: results.documents[0].count + 1,
                }
            );
            console.log("Updated document:", updatedDocument);
        }else{

            await database.createDocument(
                APPWRITE_DATABASE_ID,
                APPWRITE_COLLECTION_ID,
                ID.unique(),
                {
                    searchTerm: searchTerm,
                    count: 1,
                    movie_id: movie.id,
                    poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
                }
            )
        }

    } catch (error) {
        console.error("Error updating search term:", error);
        
    }
}

export const trendingMoviesList = async () => {
try {
        const response = await database.listDocuments(APPWRITE_DATABASE_ID, APPWRITE_COLLECTION_ID, [
            Query.orderDesc('count'),
            Query.limit(5)
        ]);
        console.log("Trending Movies:", response);
        return response.documents;
    } catch (error) {
        console.error("Error fetching trending movies:", error);
    }
}