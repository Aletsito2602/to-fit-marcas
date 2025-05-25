import 'dart:async';

import 'package:collection/collection.dart';

import '/backend/schema/util/firestore_util.dart';
import '/backend/schema/util/schema_util.dart';

import 'index.dart';
import '/flutter_flow/flutter_flow_util.dart';

class ProductosRecord extends FirestoreRecord {
  ProductosRecord._(
    DocumentReference reference,
    Map<String, dynamic> data,
  ) : super(reference, data) {
    _initializeFields();
  }

  // "nombre" field.
  String? _nombre;
  String get nombre => _nombre ?? '';
  bool hasNombre() => _nombre != null;

  // "precio" field.
  String? _precio;
  String get precio => _precio ?? '';
  bool hasPrecio() => _precio != null;

  // "precio_sd" field.
  String? _precioSd;
  String get precioSd => _precioSd ?? '';
  bool hasPrecioSd() => _precioSd != null;

  // "portada" field.
  String? _portada;
  String get portada => _portada ?? '';
  bool hasPortada() => _portada != null;

  // "tienda" field.
  String? _tienda;
  String get tienda => _tienda ?? '';
  bool hasTienda() => _tienda != null;

  // "logo_tienda" field.
  String? _logoTienda;
  String get logoTienda => _logoTienda ?? '';
  bool hasLogoTienda() => _logoTienda != null;

  // "likes" field.
  List<DocumentReference>? _likes;
  List<DocumentReference> get likes => _likes ?? const [];
  bool hasLikes() => _likes != null;

  // "id_tienda" field.
  String? _idTienda;
  String get idTienda => _idTienda ?? '';
  bool hasIdTienda() => _idTienda != null;

  // "categoria" field.
  String? _categoria;
  String get categoria => _categoria ?? '';
  bool hasCategoria() => _categoria != null;

  // "estado" field.
  String? _estado;
  String get estado => _estado ?? '';
  bool hasEstado() => _estado != null;

  // "stock" field.
  String? _stock;
  String get stock => _stock ?? '';
  bool hasStock() => _stock != null;

  // "fecha_creado" field.
  DateTime? _fechaCreado;
  DateTime? get fechaCreado => _fechaCreado;
  bool hasFechaCreado() => _fechaCreado != null;

  // "ciudad" field.
  String? _ciudad;
  String get ciudad => _ciudad ?? '';
  bool hasCiudad() => _ciudad != null;

  // "descripcion" field.
  String? _descripcion;
  String get descripcion => _descripcion ?? '';
  bool hasDescripcion() => _descripcion != null;

  // "color" field.
  List<String>? _color;
  List<String> get color => _color ?? const [];
  bool hasColor() => _color != null;

  // "talles" field.
  List<String>? _talles;
  List<String> get talles => _talles ?? const [];
  bool hasTalles() => _talles != null;

  // "coleccion" field.
  String? _coleccion;
  String get coleccion => _coleccion ?? '';
  bool hasColeccion() => _coleccion != null;

  // "cantidad" field.
  double? _cantidad;
  double get cantidad => _cantidad ?? 0.0;
  bool hasCantidad() => _cantidad != null;

  void _initializeFields() {
    _nombre = snapshotData['nombre'] as String?;
    _precio = snapshotData['precio'] as String?;
    _precioSd = snapshotData['precio_sd'] as String?;
    _portada = snapshotData['portada'] as String?;
    _tienda = snapshotData['tienda'] as String?;
    _logoTienda = snapshotData['logo_tienda'] as String?;
    _likes = getDataList(snapshotData['likes']);
    _idTienda = snapshotData['id_tienda'] as String?;
    _categoria = snapshotData['categoria'] as String?;
    _estado = snapshotData['estado'] as String?;
    _stock = snapshotData['stock'] as String?;
    _fechaCreado = snapshotData['fecha_creado'] as DateTime?;
    _ciudad = snapshotData['ciudad'] as String?;
    _descripcion = snapshotData['descripcion'] as String?;
    _color = getDataList(snapshotData['color']);
    _talles = getDataList(snapshotData['talles']);
    _coleccion = snapshotData['coleccion'] as String?;
    _cantidad = castToType<double>(snapshotData['cantidad']);
  }

  static CollectionReference get collection =>
      FirebaseFirestore.instance.collection('productos');

  static Stream<ProductosRecord> getDocument(DocumentReference ref) =>
      ref.snapshots().map((s) => ProductosRecord.fromSnapshot(s));

  static Future<ProductosRecord> getDocumentOnce(DocumentReference ref) =>
      ref.get().then((s) => ProductosRecord.fromSnapshot(s));

  static ProductosRecord fromSnapshot(DocumentSnapshot snapshot) =>
      ProductosRecord._(
        snapshot.reference,
        mapFromFirestore(snapshot.data() as Map<String, dynamic>),
      );

  static ProductosRecord getDocumentFromData(
    Map<String, dynamic> data,
    DocumentReference reference,
  ) =>
      ProductosRecord._(reference, mapFromFirestore(data));

  @override
  String toString() =>
      'ProductosRecord(reference: ${reference.path}, data: $snapshotData)';

  @override
  int get hashCode => reference.path.hashCode;

  @override
  bool operator ==(other) =>
      other is ProductosRecord &&
      reference.path.hashCode == other.reference.path.hashCode;
}

Map<String, dynamic> createProductosRecordData({
  String? nombre,
  String? precio,
  String? precioSd,
  String? portada,
  String? tienda,
  String? logoTienda,
  String? idTienda,
  String? categoria,
  String? estado,
  String? stock,
  DateTime? fechaCreado,
  String? ciudad,
  String? descripcion,
  String? coleccion,
  double? cantidad,
}) {
  final firestoreData = mapToFirestore(
    <String, dynamic>{
      'nombre': nombre,
      'precio': precio,
      'precio_sd': precioSd,
      'portada': portada,
      'tienda': tienda,
      'logo_tienda': logoTienda,
      'id_tienda': idTienda,
      'categoria': categoria,
      'estado': estado,
      'stock': stock,
      'fecha_creado': fechaCreado,
      'ciudad': ciudad,
      'descripcion': descripcion,
      'coleccion': coleccion,
      'cantidad': cantidad,
    }.withoutNulls,
  );

  return firestoreData;
}

class ProductosRecordDocumentEquality implements Equality<ProductosRecord> {
  const ProductosRecordDocumentEquality();

  @override
  bool equals(ProductosRecord? e1, ProductosRecord? e2) {
    const listEquality = ListEquality();
    return e1?.nombre == e2?.nombre &&
        e1?.precio == e2?.precio &&
        e1?.precioSd == e2?.precioSd &&
        e1?.portada == e2?.portada &&
        e1?.tienda == e2?.tienda &&
        e1?.logoTienda == e2?.logoTienda &&
        listEquality.equals(e1?.likes, e2?.likes) &&
        e1?.idTienda == e2?.idTienda &&
        e1?.categoria == e2?.categoria &&
        e1?.estado == e2?.estado &&
        e1?.stock == e2?.stock &&
        e1?.fechaCreado == e2?.fechaCreado &&
        e1?.ciudad == e2?.ciudad &&
        e1?.descripcion == e2?.descripcion &&
        listEquality.equals(e1?.color, e2?.color) &&
        listEquality.equals(e1?.talles, e2?.talles) &&
        e1?.coleccion == e2?.coleccion &&
        e1?.cantidad == e2?.cantidad;
  }

  @override
  int hash(ProductosRecord? e) => const ListEquality().hash([
        e?.nombre,
        e?.precio,
        e?.precioSd,
        e?.portada,
        e?.tienda,
        e?.logoTienda,
        e?.likes,
        e?.idTienda,
        e?.categoria,
        e?.estado,
        e?.stock,
        e?.fechaCreado,
        e?.ciudad,
        e?.descripcion,
        e?.color,
        e?.talles,
        e?.coleccion,
        e?.cantidad
      ]);

  @override
  bool isValidKey(Object? o) => o is ProductosRecord;
}
