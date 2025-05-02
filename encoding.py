import pandas as pd

# Read the CSV file
df = pd.read_csv("birdsong_metadata.csv")

# Save the CSV file with utf-8-sig encoding
df.to_csv("birdsong_metadata.csv", index=False, encoding="utf-8-sig")
