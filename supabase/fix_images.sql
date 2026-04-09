-- Fix broken Unsplash images in the cafeteria
UPDATE public.cafeteria_items SET image_url = 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0fd24?auto=format&fit=crop&w=400&q=80' WHERE name = 'Espresso';
UPDATE public.cafeteria_items SET image_url = 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=400&q=80' WHERE name = 'Iced Latte';
UPDATE public.cafeteria_items SET image_url = 'https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=400&q=80' WHERE name = 'Fresh Orange Juice';
UPDATE public.cafeteria_items SET image_url = 'https://images.unsplash.com/photo-1621263764928-df1444c5e859?auto=format&fit=crop&w=400&q=80' WHERE name = 'Sparkling Water';
UPDATE public.cafeteria_items SET image_url = 'https://images.unsplash.com/photo-1528736235302-52922df5c122?auto=format&fit=crop&w=400&q=80' WHERE name = 'Veggie Wrap';
UPDATE public.cafeteria_items SET image_url = 'https://images.unsplash.com/photo-1549903072-7e6e0d234271?auto=format&fit=crop&w=400&q=80' WHERE name = 'Chocolate Croissant';
UPDATE public.cafeteria_items SET image_url = 'https://images.unsplash.com/photo-1536591375315-1a850ca438b9?auto=format&fit=crop&w=400&q=80' WHERE name = 'Mixed Nuts';
