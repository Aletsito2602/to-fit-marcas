import 'dart:async';

import 'package:collection/collection.dart';

import '/backend/schema/util/firestore_util.dart';
import '/backend/schema/util/schema_util.dart';

import 'index.dart';
import '/flutter_flow/flutter_flow_util.dart';

class PedidosRecord extends FirestoreRecord {
  PedidosRecord._(
    DocumentReference reference,
    Map<String, dynamic> data,
  ) : super(reference, data) {
    _initializeFields();
  }

  // "numero_de_pedido" field.
  String? _numeroDePedido;
  String get numeroDePedido => _numeroDePedido ?? '';
  bool hasNumeroDePedido() => _numeroDePedido != null;

  // "productos" field.
  List<String>? _productos;
  List<String> get productos => _productos ?? const [];
  bool hasProductos() => _productos != null;

  // "precio_total" field.
  String? _precioTotal;
  String get precioTotal => _precioTotal ?? '';
  bool hasPrecioTotal() => _precioTotal != null;

  // "id_tienda" field.
  String? _idTienda;
  String get idTienda => _idTienda ?? '';
  bool hasIdTienda() => _idTienda != null;

  // "cliente" field.
  String? _cliente;
  String get cliente => _cliente ?? '';
  bool hasCliente() => _cliente != null;

  // "fecha_pedido" field.
  DateTime? _fechaPedido;
  DateTime? get fechaPedido => _fechaPedido;
  bool hasFechaPedido() => _fechaPedido != null;

  // "estado" field.
  String? _estado;
  String get estado => _estado ?? '';
  bool hasEstado() => _estado != null;

  // "fecha_compra" field.
  DateTime? _fechaCompra;
  DateTime? get fechaCompra => _fechaCompra;
  bool hasFechaCompra() => _fechaCompra != null;

  void _initializeFields() {
    _numeroDePedido = snapshotData['numero_de_pedido'] as String?;
    _productos = getDataList(snapshotData['productos']);
    _precioTotal = snapshotData['precio_total'] as String?;
    _idTienda = snapshotData['id_tienda'] as String?;
    _cliente = snapshotData['cliente'] as String?;
    _fechaPedido = snapshotData['fecha_pedido'] as DateTime?;
    _estado = snapshotData['estado'] as String?;
    _fechaCompra = snapshotData['fecha_compra'] as DateTime?;
  }

  static CollectionReference get collection =>
      FirebaseFirestore.instance.collection('pedidos');

  static Stream<PedidosRecord> getDocument(DocumentReference ref) =>
      ref.snapshots().map((s) => PedidosRecord.fromSnapshot(s));

  static Future<PedidosRecord> getDocumentOnce(DocumentReference ref) =>
      ref.get().then((s) => PedidosRecord.fromSnapshot(s));

  static PedidosRecord fromSnapshot(DocumentSnapshot snapshot) =>
      PedidosRecord._(
        snapshot.reference,
        mapFromFirestore(snapshot.data() as Map<String, dynamic>),
      );

  static PedidosRecord getDocumentFromData(
    Map<String, dynamic> data,
    DocumentReference reference,
  ) =>
      PedidosRecord._(reference, mapFromFirestore(data));

  @override
  String toString() =>
      'PedidosRecord(reference: ${reference.path}, data: $snapshotData)';

  @override
  int get hashCode => reference.path.hashCode;

  @override
  bool operator ==(other) =>
      other is PedidosRecord &&
      reference.path.hashCode == other.reference.path.hashCode;
}

Map<String, dynamic> createPedidosRecordData({
  String? numeroDePedido,
  String? precioTotal,
  String? idTienda,
  String? cliente,
  DateTime? fechaPedido,
  String? estado,
  DateTime? fechaCompra,
}) {
  final firestoreData = mapToFirestore(
    <String, dynamic>{
      'numero_de_pedido': numeroDePedido,
      'precio_total': precioTotal,
      'id_tienda': idTienda,
      'cliente': cliente,
      'fecha_pedido': fechaPedido,
      'estado': estado,
      'fecha_compra': fechaCompra,
    }.withoutNulls,
  );

  return firestoreData;
}

class PedidosRecordDocumentEquality implements Equality<PedidosRecord> {
  const PedidosRecordDocumentEquality();

  @override
  bool equals(PedidosRecord? e1, PedidosRecord? e2) {
    const listEquality = ListEquality();
    return e1?.numeroDePedido == e2?.numeroDePedido &&
        listEquality.equals(e1?.productos, e2?.productos) &&
        e1?.precioTotal == e2?.precioTotal &&
        e1?.idTienda == e2?.idTienda &&
        e1?.cliente == e2?.cliente &&
        e1?.fechaPedido == e2?.fechaPedido &&
        e1?.estado == e2?.estado &&
        e1?.fechaCompra == e2?.fechaCompra;
  }

  @override
  int hash(PedidosRecord? e) => const ListEquality().hash([
        e?.numeroDePedido,
        e?.productos,
        e?.precioTotal,
        e?.idTienda,
        e?.cliente,
        e?.fechaPedido,
        e?.estado,
        e?.fechaCompra
      ]);

  @override
  bool isValidKey(Object? o) => o is PedidosRecord;
}
