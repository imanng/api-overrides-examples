class Coffee {
  final String id;
  final String title;
  final String description;
  final List<String> ingredients;
  final String image;

  Coffee({
    required this.id,
    required this.title,
    required this.description,
    required this.ingredients,
    required this.image,
  });

  factory Coffee.fromJson(Map<String, dynamic> json) {
    // Handle id as string or number
    final id = json['id']?.toString() ?? '';

    // Handle ingredients as list or string
    List<String> ingredients = [];
    if (json['ingredients'] is List) {
      ingredients = List<String>.from(json['ingredients'].map((e) => e.toString()));
    } else if (json['ingredients'] is String) {
      ingredients = [json['ingredients']];
    }

    // Handle image as string or list
    String image = '';
    if (json['image'] is List && (json['image'] as List).isNotEmpty) {
      image = json['image'][0].toString();
    } else if (json['image'] is String) {
      image = json['image'];
    }

    return Coffee(
      id: id,
      title: json['title']?.toString() ?? 'Unknown',
      description: json['description']?.toString() ?? '',
      ingredients: ingredients,
      image: image,
    );
  }

  // Check if image URL is valid
  bool get hasValidImage {
    return image.startsWith('http://') || image.startsWith('https://');
  }
}
