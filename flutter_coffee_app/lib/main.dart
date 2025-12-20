import 'package:flutter/material.dart';
import 'screens/coffee_list_screen.dart';

void main() {
  runApp(const CoffeeApp());
}

class CoffeeApp extends StatelessWidget {
  const CoffeeApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Coffee App',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        colorScheme: ColorScheme.dark(
          primary: const Color(0xFFD4A574),
          secondary: const Color(0xFF8B5A2B),
          surface: const Color(0xFF2D2D2D),
        ),
        scaffoldBackgroundColor: const Color(0xFF1A1A1A),
        useMaterial3: true,
      ),
      home: const CoffeeListScreen(),
    );
  }
}
