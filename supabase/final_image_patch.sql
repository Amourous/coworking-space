-- Final patch to swap out the last unreliable Unsplash links for ultra-stable Pexels images
UPDATE public.spaces 
SET image_url = 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=800' 
WHERE name = 'Synergy Lab';

UPDATE public.cafeteria_items 
SET image_url = 'https://images.pexels.com/photos/3223494/pexels-photo-3223494.jpeg?auto=compress&cs=tinysrgb&w=400' 
WHERE name = 'Chocolate Croissant';

UPDATE public.cafeteria_items 
SET image_url = 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=400' 
WHERE name = 'Espresso';

UPDATE public.cafeteria_items 
SET image_url = 'https://images.pexels.com/photos/5928811/pexels-photo-5928811.jpeg?auto=compress&cs=tinysrgb&w=400' 
WHERE name = 'Mixed Nuts';
