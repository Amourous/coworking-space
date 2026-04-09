-- SEED DATA FOR WORKNEST

-- Spaces
INSERT INTO public.spaces (name, type, description, image_url, capacity, price_hourly, price_daily, amenities, labels) VALUES
('Flex Desk A', 'hot_desk', 'Comfortable hot desk in the open plan area with natural light and ergonomic chair.', 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=800&q=80', 1, 3.00, 18.00, '["high_speed_wifi", "ergonomic_chair", "power_outlets"]', '["best_for_focus"]'),
('Flex Desk B', 'hot_desk', 'Standard hot desk near the community lounge.', 'https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?auto=format&fit=crop&w=800&q=80', 1, 3.00, 18.00, '["high_speed_wifi", "ergonomic_chair", "power_outlets"]', '[]'),
('Pro Desk', 'dedicated_desk', 'Your own dedicated desk with a lockable filing cabinet and 27-inch 4K monitor.', 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=800&q=80', 1, 5.00, 30.00, '["high_speed_wifi", "ergonomic_chair", "power_outlets", "4k_monitor", "lockable_cabinet"]', '["premium"]'),
('Focus Pod 1', 'quiet_booth', 'Soundproof booth perfect for deep work or important video calls.', 'https://images.unsplash.com/photo-1593062096033-9a26b09da705?auto=format&fit=crop&w=800&q=80', 1, 4.00, 25.00, '["high_speed_wifi", "soundproof", "power_outlets", "adjustable_lighting"]', '["best_for_focus", "quiet_zone"]'),
('The Huddle', 'meeting_room', 'Small meeting room designed for quick syncs and brainstorming sessions.', 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80', 6, 15.00, 90.00, '["high_speed_wifi", "whiteboard", "tv_screen", "coffee_service_optional"]', '["best_for_teams"]'),
('The Boardroom', 'meeting_room', 'Premium boardroom with high-end AV equipment for formal presentations.', 'https://images.unsplash.com/photo-1517502884422-41eaead166d4?auto=format&fit=crop&w=800&q=80', 12, 25.00, 150.00, '["high_speed_wifi", "projector", "whiteboard", "teleconferencing", "catering_optional"]', '["premium", "best_for_teams"]'),
('Synergy Lab', 'collab_room', 'Creative space with modular furniture and writable walls.', 'https://images.unsplash.com/photo-1531496730046-04952011b933?auto=format&fit=crop&w=800&q=80', 8, 20.00, 120.00, '["high_speed_wifi", "writable_walls", "modular_furniture", "brainstorming_kits"]', '["creative_zone"]'),
('The Studio', 'event_room', 'Large adaptable space suitable for workshops, seminars, and networking events.', 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=800&q=80', 30, 40.00, 250.00, '["high_speed_wifi", "projector", "pa_system", "stage_area"]', '["events"]'),
('The Lounge', 'lounge', 'Casual seating area perfect for networking, reading, or taking a break.', 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80', 15, 0.00, 0.00, '["high_speed_wifi", "couches", "coffee_machine_nearby", "magazines"]', '["chill_zone"]');

-- Cafeteria Items
INSERT INTO public.cafeteria_items (name, description, category, price, image_url) VALUES
('Espresso', 'A rich and intense shot of pure coffee.', 'coffee', 2.20, 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0fd24?auto=format&fit=crop&w=400&q=80'),
('Cappuccino', 'Classic Italian coffee with perfectly frothed milk.', 'coffee', 3.50, 'https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=400&q=80'),
('Iced Latte', 'Chilled espresso and milk over ice for hot study days.', 'coffee', 4.20, 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=400&q=80'),
('Green Tea', 'Refreshing and loaded with antioxidants.', 'tea', 2.50, 'https://images.unsplash.com/photo-1627435601361-ec25f5b1d0e5?auto=format&fit=crop&w=400&q=80'),
('Fresh Orange Juice', 'Squeezed to order.', 'cold_drinks', 3.90, 'https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=400&q=80'),
('Sparkling Water', 'Chilled sparkling carbonated water.', 'cold_drinks', 2.00, 'https://images.unsplash.com/photo-1621263764928-df1444c5e859?auto=format&fit=crop&w=400&q=80'),
('Turkey Sandwich', 'Sliced turkey breast, Swiss cheese, and fresh greens on whole wheat artisan bread.', 'sandwiches', 5.90, 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=400&q=80'),
('Veggie Wrap', 'Grilled peppers, hummus, and spinach wrapped in a whole grain tortilla.', 'wraps', 5.50, 'https://images.unsplash.com/photo-1528736235302-52922df5c122?auto=format&fit=crop&w=400&q=80'),
('Quinoa Salad', 'Nutritious mix of quinoa, cherry tomatoes, cucumbers, and lemon dressing.', 'salads', 6.50, 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=400&q=80'),
('Chocolate Croissant', 'Flaky, buttery pastry filled with rich dark chocolate.', 'pastries', 2.80, 'https://images.unsplash.com/photo-1549903072-7e6e0d234271?auto=format&fit=crop&w=400&q=80'),
('Mixed Nuts', 'A healthy trail mix of almonds, cashews, and walnuts.', 'snacks', 3.50, 'https://images.unsplash.com/photo-1536591375315-1a850ca438b9?auto=format&fit=crop&w=400&q=80'),
('Vegan Brownie', 'Fudgy, dense, and completely plant-based sweet treat.', 'desserts', 3.20, 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=400&q=80');

-- Testimonials
INSERT INTO public.testimonials (author_name, author_role, content, rating, avatar_url) VALUES
('Sarah Jenkins', 'Freelance Designer', 'WorkNest changed the way I work. The atmosphere is vibrant, internet is blazing fast, and I love the focus pods when I have client meetings.', 5, 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80'),
('Michael Chen', 'Startup Founder', 'We built our MVP mostly working from the Synergy Lab room here. Best investment we made to get the team out of the garage.', 5, 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80'),
('Elena Rodriguez', 'Computer Science Student', 'As a student, the hot desk pricing is perfect. I study better here than on campus, and the coffee is actually good!', 4, 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80');

-- Announcements
INSERT INTO public.announcements (title, content, type) VALUES
('Welcome to WorkNest!', 'We are officially open! Enjoy a 20% discount on all meeting room bookings this week.', 'promo'),
('Community Networking Night', 'Join us this Friday at 6pm in The Lounge for free pizza and networking.', 'event');
