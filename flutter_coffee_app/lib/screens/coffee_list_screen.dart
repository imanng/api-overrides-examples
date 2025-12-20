import 'package:flutter/material.dart';
import '../models/coffee_model.dart';
import '../services/coffee_service.dart';
import '../widgets/coffee_card.dart';
import 'coffee_detail_screen.dart';

class CoffeeListScreen extends StatefulWidget {
  const CoffeeListScreen({super.key});

  @override
  State<CoffeeListScreen> createState() => _CoffeeListScreenState();
}

class _CoffeeListScreenState extends State<CoffeeListScreen> {
  final CoffeeService _coffeeService = CoffeeService();
  late Future<List<Coffee>> _coffeesFuture;

  @override
  void initState() {
    super.initState();
    _coffeesFuture = _coffeeService.getHotCoffees();
  }

  Future<void> _refresh() async {
    setState(() {
      _coffeesFuture = _coffeeService.getHotCoffees();
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFF1A1A1A),
      appBar: AppBar(
        backgroundColor: Colors.transparent,
        elevation: 0,
        title: const Row(
          children: [
            Icon(Icons.coffee, color: Color(0xFFD4A574)),
            SizedBox(width: 8),
            Text(
              'Coffee Menu',
              style: TextStyle(
                color: Colors.white,
                fontWeight: FontWeight.bold,
              ),
            ),
          ],
        ),
      ),
      body: RefreshIndicator(
        onRefresh: _refresh,
        color: const Color(0xFFD4A574),
        child: FutureBuilder<List<Coffee>>(
          future: _coffeesFuture,
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
                    const Icon(
                      Icons.error_outline,
                      size: 48,
                      color: Colors.red,
                    ),
                    const SizedBox(height: 16),
                    Text(
                      'Failed to load coffees',
                      style: TextStyle(color: Colors.grey[400]),
                    ),
                    const SizedBox(height: 16),
                    ElevatedButton(
                      onPressed: _refresh,
                      style: ElevatedButton.styleFrom(
                        backgroundColor: const Color(0xFFD4A574),
                        foregroundColor: Colors.white,
                      ),
                      child: const Text('Retry'),
                    ),
                  ],
                ),
              );
            }

            final coffees = snapshot.data ?? [];

            return Padding(
              padding: const EdgeInsets.all(16),
              child: GridView.builder(
                gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                  crossAxisCount: 2,
                  childAspectRatio: 0.75,
                  crossAxisSpacing: 16,
                  mainAxisSpacing: 16,
                ),
                itemCount: coffees.length,
                itemBuilder: (context, index) {
                  final coffee = coffees[index];
                  return CoffeeCard(
                    coffee: coffee,
                    onTap: () {
                      Navigator.push(
                        context,
                        MaterialPageRoute(
                          builder: (context) =>
                              CoffeeDetailScreen(coffeeId: coffee.id),
                        ),
                      );
                    },
                  );
                },
              ),
            );
          },
        ),
      ),
    );
  }
}
