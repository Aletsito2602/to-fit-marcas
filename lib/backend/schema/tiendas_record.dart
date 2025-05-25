import 'dart:async';

import 'package:collection/collection.dart';

import '/backend/schema/util/firestore_util.dart';

import 'index.dart';
import '/flutter_flow/flutter_flow_util.dart';

class TiendasRecord extends FirestoreRecord {
  TiendasRecord._(
    DocumentReference reference,
    Map<String, dynamic> data,
  ) : super(reference, data) {
    _initializeFields();
  }

  // "nombre" field.
  String? _nombre;
  String get nombre => _nombre ?? '';
  bool hasNombre() => _nombre != null;

  // "id_tienda" field.
  String? _idTienda;
  String get idTienda => _idTienda ?? '';
  bool hasIdTienda() => _idTienda != null;

  // "logo_tienda" field.
  String? _logoTienda;
  String get logoTienda => _logoTienda ?? '';
  bool hasLogoTienda() => _logoTienda != null;

  // "portada_tienda" field.
  String? _portadaTienda;
  String get portadaTienda => _portadaTienda ?? '';
  bool hasPortadaTienda() => _portadaTienda != null;

  // "alias_tienda" field.
  String? _aliasTienda;
  String get aliasTienda => _aliasTienda ?? '';
  bool hasAliasTienda() => _aliasTienda != null;

  // "portada_minimal" field.
  String? _portadaMinimal;
  String get portadaMinimal => _portadaMinimal ?? '';
  bool hasPortadaMinimal() => _portadaMinimal != null;

  // "portada_venta_tienda" field.
  String? _portadaVentaTienda;
  String get portadaVentaTienda => _portadaVentaTienda ?? '';
  bool hasPortadaVentaTienda() => _portadaVentaTienda != null;

  // "fecha_de_creacion" field.
  DateTime? _fechaDeCreacion;
  DateTime? get fechaDeCreacion => _fechaDeCreacion;
  bool hasFechaDeCreacion() => _fechaDeCreacion != null;

  void _initializeFields() {
    _nombre = snapshotData['nombre'] as String?;
    _idTienda = snapshotData['id_tienda'] as String?;
    _logoTienda = snapshotData['logo_tienda'] as String?;
    _portadaTienda = snapshotData['portada_tienda'] as String?;
    _aliasTienda = snapshotData['alias_tienda'] as String?;
    _portadaMinimal = snapshotData['portada_minimal'] as String?;
    _portadaVentaTienda = snapshotData['portada_venta_tienda'] as String?;
    _fechaDeCreacion = snapshotData['fecha_de_creacion'] as DateTime?;
  }

  static CollectionReference get collection =>
      FirebaseFirestore.instance.collection('tiendas');

  static Stream<TiendasRecord> getDocument(DocumentReference ref) =>
      ref.snapshots().map((s) => TiendasRecord.fromSnapshot(s));

  static Future<TiendasRecord> getDocumentOnce(DocumentReference ref) =>
      ref.get().then((s) => TiendasRecord.fromSnapshot(s));

  static TiendasRecord fromSnapshot(DocumentSnapshot snapshot) =>
      TiendasRecord._(
        snapshot.reference,
        mapFromFirestore(snapshot.data() as Map<String, dynamic>),
      );

  static TiendasRecord getDocumentFromData(
    Map<String, dynamic> data,
    DocumentReference reference,
  ) =>
      TiendasRecord._(reference, mapFromFirestore(data));

  @override
  String toString() =>
      'TiendasRecord(reference: ${reference.path}, data: $snapshotData)';

  @override
  int get hashCode => reference.path.hashCode;

  @override
  bool operator ==(other) =>
      other is TiendasRecord &&
      reference.path.hashCode == other.reference.path.hashCode;
}

Map<String, dynamic> createTiendasRecordData({
  String? nombre,
  String? idTienda,
  String? logoTienda,
  String? portadaTienda,
  String? aliasTienda,
  String? portadaMinimal,
  String? portadaVentaTienda,
  DateTime? fechaDeCreacion,
}) {
  final firestoreData = mapToFirestore(
    <String, dynamic>{
      'nombre': nombre,
      'id_tienda': idTienda,
      'logo_tienda': logoTienda,
      'portada_tienda': portadaTienda,
      'alias_tienda': aliasTienda,
      'portada_minimal': portadaMinimal,
      'portada_venta_tienda': portadaVentaTienda,
      'fecha_de_creacion': fechaDeCreacion,
    }.withoutNulls,
  );

  return firestoreData;
}

class TiendasRecordDocumentEquality implements Equality<TiendasRecord> {
  const TiendasRecordDocumentEquality();

  @override
  bool equals(TiendasRecord? e1, TiendasRecord? e2) {
    return e1?.nombre == e2?.nombre &&
        e1?.idTienda == e2?.idTienda &&
        e1?.logoTienda == e2?.logoTienda &&
        e1?.portadaTienda == e2?.portadaTienda &&
        e1?.aliasTienda == e2?.aliasTienda &&
        e1?.portadaMinimal == e2?.portadaMinimal &&
        e1?.portadaVentaTienda == e2?.portadaVentaTienda &&
        e1?.fechaDeCreacion == e2?.fechaDeCreacion;
  }

  @override
  int hash(TiendasRecord? e) => const ListEquality().hash([
        e?.nombre,
        e?.idTienda,
        e?.logoTienda,
        e?.portadaTienda,
        e?.aliasTienda,
        e?.portadaMinimal,
        e?.portadaVentaTienda,
        e?.fechaDeCreacion
      ]);

  @override
  bool isValidKey(Object? o) => o is TiendasRecord;
}
