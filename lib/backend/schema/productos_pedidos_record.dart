import 'dart:async';

import 'package:collection/collection.dart';

import '/backend/schema/util/firestore_util.dart';

import 'index.dart';
import '/flutter_flow/flutter_flow_util.dart';

class ProductosPedidosRecord extends FirestoreRecord {
  ProductosPedidosRecord._(
    DocumentReference reference,
    Map<String, dynamic> data,
  ) : super(reference, data) {
    _initializeFields();
  }

  // "foto" field.
  String? _foto;
  String get foto => _foto ?? '';
  bool hasFoto() => _foto != null;

  // "nombre" field.
  String? _nombre;
  String get nombre => _nombre ?? '';
  bool hasNombre() => _nombre != null;

  // "precio" field.
  String? _precio;
  String get precio => _precio ?? '';
  bool hasPrecio() => _precio != null;

  DocumentReference get parentReference => reference.parent.parent!;

  void _initializeFields() {
    _foto = snapshotData['foto'] as String?;
    _nombre = snapshotData['nombre'] as String?;
    _precio = snapshotData['precio'] as String?;
  }

  static Query<Map<String, dynamic>> collection([DocumentReference? parent]) =>
      parent != null
          ? parent.collection('productos_pedidos')
          : FirebaseFirestore.instance.collectionGroup('productos_pedidos');

  static DocumentReference createDoc(DocumentReference parent, {String? id}) =>
      parent.collection('productos_pedidos').doc(id);

  static Stream<ProductosPedidosRecord> getDocument(DocumentReference ref) =>
      ref.snapshots().map((s) => ProductosPedidosRecord.fromSnapshot(s));

  static Future<ProductosPedidosRecord> getDocumentOnce(
          DocumentReference ref) =>
      ref.get().then((s) => ProductosPedidosRecord.fromSnapshot(s));

  static ProductosPedidosRecord fromSnapshot(DocumentSnapshot snapshot) =>
      ProductosPedidosRecord._(
        snapshot.reference,
        mapFromFirestore(snapshot.data() as Map<String, dynamic>),
      );

  static ProductosPedidosRecord getDocumentFromData(
    Map<String, dynamic> data,
    DocumentReference reference,
  ) =>
      ProductosPedidosRecord._(reference, mapFromFirestore(data));

  @override
  String toString() =>
      'ProductosPedidosRecord(reference: ${reference.path}, data: $snapshotData)';

  @override
  int get hashCode => reference.path.hashCode;

  @override
  bool operator ==(other) =>
      other is ProductosPedidosRecord &&
      reference.path.hashCode == other.reference.path.hashCode;
}

Map<String, dynamic> createProductosPedidosRecordData({
  String? foto,
  String? nombre,
  String? precio,
}) {
  final firestoreData = mapToFirestore(
    <String, dynamic>{
      'foto': foto,
      'nombre': nombre,
      'precio': precio,
    }.withoutNulls,
  );

  return firestoreData;
}

class ProductosPedidosRecordDocumentEquality
    implements Equality<ProductosPedidosRecord> {
  const ProductosPedidosRecordDocumentEquality();

  @override
  bool equals(ProductosPedidosRecord? e1, ProductosPedidosRecord? e2) {
    return e1?.foto == e2?.foto &&
        e1?.nombre == e2?.nombre &&
        e1?.precio == e2?.precio;
  }

  @override
  int hash(ProductosPedidosRecord? e) =>
      const ListEquality().hash([e?.foto, e?.nombre, e?.precio]);

  @override
  bool isValidKey(Object? o) => o is ProductosPedidosRecord;
}
