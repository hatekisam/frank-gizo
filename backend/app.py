import pymongo

# MongoDB connection settings
mongo_url = "mongodb://localhost:27017"  # Update with your MongoDB connection URL
database_name = "shdr"      # Update with your database name

# Data to be inserted
house_plan_categories = [
   "Colonial",
    "Cape Cod",
    "Victorian",
    "Mediterranean",
    "Modern",
    "Ranch",
    "Tiny House",
    "Small House",
    "Large House",
    "Single-Story",
    "Two-Story",
    "Split-Level",
    "Open Concept",
    "Multi-Family",
    "Multi-Generational",
    "Energy-Efficient",
    "Smart Homes",
    "Vacation Homes",
    "Duplexes/Townhouses",
    "Custom Plans",
    "Stock Plans",
    "Luxury Homes",
    "Sustainable/Green Homes",
    "Historical Reproduction"
]


# Convert the list of strings into a list of dictionaries
categories_data = [{"category": category} for category in house_plan_categories]

# Create a MongoDB client
client = pymongo.MongoClient(mongo_url)

try:
    # Connect to the specified database
    db = client[database_name]

    # Get the collection (assuming it's named "housePlanCategories")
    collection = db["projectcategories"]

    # Insert the categories into the collection
    result = collection.insert_many(categories_data)

    print(f"Inserted {len(result.inserted_ids)} categories into the collection.")
except Exception as e:
    print("Error inserting categories:", str(e))
finally:
    # Close the MongoDB client
    client.close()
