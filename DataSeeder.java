package com.ecom.productcatalog.config;

import com.ecom.productcatalog.model.Category;
import com.ecom.productcatalog.model.Product;
import com.ecom.productcatalog.repository.CategoryRepository;
import com.ecom.productcatalog.repository.ProductRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Arrays;

//@Component
public class DataSeeder implements CommandLineRunner {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;

    public DataSeeder(ProductRepository productRepository, CategoryRepository categoryRepository) {
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        // Clear all pre-existing data
        productRepository.deleteAll();
        categoryRepository.deleteAll();

        // Create Categories
        Category electronics = new Category();
        electronics.setName("Electronics");

        Category clothing = new Category();
        clothing.setName("Clothing");

        Category home = new Category();
        home.setName("Home And Kitchen");

        // Save Categories to the database
        categoryRepository.saveAll(Arrays.asList(electronics, home, clothing));

        // Create Products
        Product phone = new Product();
        phone.setName("SmartPhone");
        phone.setDescription("Latest model smartphone with amazing features");
        phone.setImageUrl("https://placehold.co/600x400");
        phone.setPrice(699.99);
        phone.setCategory(electronics);

        Product laptop = new Product();
        laptop.setName("laptop");
        laptop.setDescription("Latest model laptop with amazing features");
        laptop.setImageUrl("https://placehold.co/600x400");
        laptop.setPrice(999.99);
        laptop.setCategory(electronics);

        Product jacket = new Product();
        jacket.setName("Winter Jacket");
        jacket.setDescription("Warm and cozy Jacket for Winter");
        jacket.setImageUrl("https://placehold.co/600x400");
        jacket.setPrice(150.99);
        jacket.setCategory(clothing);

        Product mixer = new Product();
        mixer.setName("Mixer");
        mixer.setDescription("High performance");
        mixer.setImageUrl("https://placehold.co/600x400");
        mixer.setPrice(89.99);
        mixer.setCategory(home);

        // Save Products to the database
        productRepository.saveAll(Arrays.asList(phone, laptop, jacket, mixer));
    }
}