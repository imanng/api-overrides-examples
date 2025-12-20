import 'package:flutter/material.dart';
import '../models/coffee_model.dart';
import '../services/coffee_service.dart';

class CoffeeDetailScreen extends StatefulWidget {
  final String coffeeId;

  const CoffeeDetailScreen({super.key, required this.coffeeId});

  @override
  State<CoffeeDetailScreen> createState() => _CoffeeDetailScreenState();
}

class _CoffeeDetailScreenState extends State<CoffeeDetailScreen> {
  final CoffeeService _coffeeService = CoffeeService();
  late Future<Coffee> _coffeeFuture;

  @override
  void initState() {
    super.initState();
    _coffeeFuture = _coffeeService.getCoffeeById(widget.coffeeId);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFF1A1A1A),
      body: FutureBuilder<Coffee>(
        future: _coffeeFuture,
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return const Center(
              child: CircularProgressIndicator(color: Color(0xFFD4A574)),
            );
          }

          if (snapshot.hasError) {
            return Center(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  const Icon(Icons.error_outline, size: 48, color: Colors.red),
                  const SizedBox(height: 16),
                  Text(
                    'Failed to load coffee',
                    style: TextStyle(color: Colors.grey[400]),
                  ),
                  const SizedBox(height: 16),
                  ElevatedButton(
                    onPressed: () => Navigator.pop(context),
                    style: ElevatedButton.styleFrom(
                      backgroundColor: const Color(0xFFD4A574),
                    ),
                    child: const Text('Go Back'),
                  ),
                ],
              ),
            );
          }

          final coffee = snapshot.data!;
          return _buildContent(coffee);
        },
      ),
    );
  }

  Widget _buildContent(Coffee coffee) {
    return CustomScrollView(
      slivers: [
        SliverAppBar(
          expandedHeight: 300,
          pinned: true,
          backgroundColor: const Color(0xFF2D2D2D),
          leading: IconButton(
            icon: const Icon(Icons.arrow_back, color: Colors.white),
            onPressed: () => Navigator.pop(context),
          ),
          flexibleSpace: FlexibleSpaceBar(
            background: Hero(
              tag: 'coffee-${coffee.id}',
              child: Stack(
                fit: StackFit.expand,
                children: [
                  coffee.hasValidImage
                      ? Image.network(
                          coffee.image,
                          fit: BoxFit.cover,
                          errorBuilder: (context, error, stackTrace) =>
                              _buildPlaceholder(),
                        )
                      : _buildPlaceholder(),
                  Container(
                    decoration: BoxDecoration(
                      gradient: LinearGradient(
                        begin: Alignment.topCenter,
                        end: Alignment.bottomCenter,
                        colors: [
                          Colors.transparent,
                          Colors.black.withOpacity(0.7),
                        ],
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ),
        ),
        SliverToBoxAdapter(
          child: Padding(
            padding: const EdgeInsets.all(24),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  coffee.title,
                  style: const TextStyle(
                    color: Colors.white,
                    fontSize: 28,
                    fontWeight: FontWeight.bold,
                  ),
                ),
                const SizedBox(height: 16),
                if (coffee.description.isNotEmpty) ...[
                  Text(
                    coffee.description,
                    style: TextStyle(
                      color: Colors.grey[300],
                      fontSize: 16,
                      height: 1.5,
                    ),
                  ),
                  const SizedBox(height: 24),
                ],
                const Text(
                  'Ingredients',
                  style: TextStyle(
                    color: Color(0xFFD4A574),
                    fontSize: 20,
                    fontWeight: FontWeight.bold,
                  ),
                ),
                const SizedBox(height: 12),
                Wrap(
                  spacing: 8,
                  runSpacing: 8,
                  children: coffee.ingredients.map((ingredient) {
                    return Container(
                      padding: const EdgeInsets.symmetric(
                        horizontal: 16,
                        vertical: 8,
                      ),
                      decoration: BoxDecoration(
                        color: const Color(0xFFD4A574).withOpacity(0.2),
                        borderRadius: BorderRadius.circular(20),
                        border: Border.all(
                          color: const Color(0xFFD4A574).withOpacity(0.5),
                        ),
                      ),
                      child: Text(
                        ingredient,
                        style: const TextStyle(
                          color: Color(0xFFD4A574),
                          fontSize: 14,
                        ),
                      ),
                    );
                  }).toList(),
                ),
              ],
            ),
          ),
        ),
      ],
    );
  }

  Widget _buildPlaceholder() {
    return Container(
      color: Colors.brown[800],
      child: const Center(
        child: Icon(Icons.coffee, size: 64, color: Color(0xFFD4A574)),
      ),
    );
  }
}
