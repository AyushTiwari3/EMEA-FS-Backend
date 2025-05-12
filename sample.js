TRY:
  region_data ← Fetch from BACKEND_API
  IF region_data is invalid then
    RETURN error("Invalid region data")
  FOR each region ∈ region_data do
    invalid_pct ← (region.invalid_count / region.total_count) × 100
    ppm_value ← Extract numeric PPM(region.ppm_value)
    priority_score ← (invalid_pct × 0.6) + (ppm_value × 0.4)
    Append {
      …region,
      invalid_percentage: invalid_pct,
      ppm_numeric: ppm_value,
      priority_score: priority_score
    } to processed_regions
  sort_method ← Get selected sort method
  IF sort_method = "puc" then
    Sort processed_regions descending by invalid_percentage
  ELSE IF sort_method = "ppm" then
    Sort processed_regions descending by ppm_numeric
  ELSE
    Sort processed_regions descending by priority_score
  RETURN top 5 regions from processed_regions
CATCH error:
  Log error
  RETURN error("Failed to process problem regions")
