import 'dart:convert';
import 'package:http/http.dart' as http;
import '../models/coffee_model.dart';

class CoffeeService {
  static const String _baseUrl =
      'https://api-overrides.anng.dev/api/proxy/main';

  Future<List<Coffee>> getHotCoffees() async {
    try {
      final response = await http.get(Uri.parse('$_baseUrl/coffee/hot'));

      if (response.statusCode == 200) {
        final List<dynamic> jsonList = json.decode(response.body);
        return jsonList
            .map((json) => Coffee.fromJson(json))
            .where(
              (coffee) => coffee.title.isNotEmpty && coffee.title != 'title',
            )
            .toList();
      } else {
        throw Exception('Failed to load coffees: ${response.statusCode}');
      }
    } catch (e) {
      throw Exception('Failed to load coffees: $e');
    }
  }

  Future<Coffee> getCoffeeById(String id) async {
    try {
      final response = await http.get(Uri.parse('$_baseUrl/coffee/hot/$id'));

      if (response.statusCode == 200) {
        final json = jsonDecode(response.body);
        return Coffee.fromJson(json);
      } else {
        throw Exception('Failed to load coffee: ${response.statusCode}');
      }
    } catch (e) {
      throw Exception('Failed to load coffee: $e');
    }
  }
}
