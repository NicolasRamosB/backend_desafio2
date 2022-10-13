const fs = require("fs/promises");

const product = [
  {
    title: "Remera",
    price: 100,
    thumbnail:
      "https://www.pexels.com/es-es/foto/pareja-cama-relajandose-masculino-10272502/",
  },
  {
    title: "Pantalon",
    price: 200,
    thumbnail:
      "https://www.pexels.com/es-es/foto/pareja-cama-relajandose-masculino-10272502/",
  },
  {
    title: "Gorra",
    price: 300,
    thumbnail:
      "https://www.pexels.com/es-es/foto/pareja-cama-relajandose-masculino-10272502/",
  },
];

class Contenedor {
  constructor(file) {
    this.file = file;
  }

  async save(data) {
    try {
      const response = await fs.readFile(this.file, { encoding: "utf-8" });
      const parsed = await JSON.parse(response);
      const id = parsed.length + 1;
      parsed.push({ id, ...data });
      await fs.writeFile(this.file, JSON.stringify(parsed), null, 2);

      return id;
    } catch {
      await fs.writeFile(
        this.file,
        JSON.stringify([{ id: 1, ...data }], null, 2)
      );
      return 1;
    }
  }
  async getById(id) {
    try {
      const response = await fs.readFile(this.file, { encoding: "utf-8" });
      const parsed = await JSON.parse(response);
      return (await parsed.find((item) => item.id === id)) || null;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getAll() {
    try {
      const response = await fs.readFile(this.file, { encoding: "utf-8" });
      return await JSON.parse(response);
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteById(id) {
    try {
      const response = await fs.readFile(this.file, { encoding: "utf-8" });
      const parsed = await JSON.parse(response);
      const deleteId = parsed.filter((item) => item.id !== id);
      await fs.writeFile(this.file, JSON.stringify(deleteId));
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteAll() {
    try {
      await fs.writeFile(this.file, "[]");
    } catch (error) {
      throw new Error(error);
    }
  }
}

const powerOn = async () => {
  try {
    const producto = new Contenedor("productos.txt");
    await producto.save(product[0]);
   
    console.log(await producto.getById(3));
    console.log(await producto.getAll());
    await producto.deleteById(4);

    // Descomentar para deleteAll
    // await producto.deleteAll();
    
  } catch (error) {
    console.log(error.message);
  }
};

powerOn();
