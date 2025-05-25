import 'dart:async';

import 'package:collection/collection.dart';

import '/backend/schema/util/firestore_util.dart';

import 'index.dart';
import '/flutter_flow/flutter_flow_util.dart';

class ColeccionInternaRecord extends FirestoreRecord {
  ColeccionInternaRecord._(
    DocumentReference reference,
    Map<String, dynamic> data,
  ) : super(reference, data) {
    _initializeFields();
  }

  // "portada" field.
  String? _portada;
  String get portada => _portada ?? '';
  bool hasPortada() => _portada != null;

  // "info" field.
  String? _info;
  String get info => _info ?? '';
  bool hasInfo() => _info != null;

  // "nombre" field.
  String? _nombre;
  String get nombre => _nombre ?? '';
  bool hasNombre() => _nombre != null;

  DocumentReference get parentReference => reference.parent.parent!;

  void _initializeFields() {
    _portada = snapshotData['portada'] as String?;
    _info = snapshotData['info'] as String?;
    _nombre = snapshotData['nombre'] as String?;
  }

  static Query<Map<String, dynamic>> collection([DocumentReference? parent]) =>
      parent != null
          ? parent.collection('coleccion_interna')
          : FirebaseFirestore.instance.collectionGroup('coleccion_interna');

  static DocumentReference createDoc(DocumentReference parent, {String? id}) =>
      parent.collection('coleccion_interna').doc(id);

  static Stream<ColeccionInternaRecord> getDocument(DocumentReference ref) =>
      ref.snapshots().map((s) => ColeccionInternaRecord.fromSnapshot(s));

  static Future<ColeccionInternaRecord> getDocumentOnce(
          DocumentReference ref) =>
      ref.get().then((s) => ColeccionInternaRecord.fromSnapshot(s));

  static ColeccionInternaRecord fromSnapshot(DocumentSnapshot snapshot) =>
      ColeccionInternaRecord._(
        snapshot.reference,
        mapFromFirestore(snapshot.data() as Map<String, dynamic>),
      );

  static ColeccionInternaRecord getDocumentFromData(
    Map<String, dynamic> data,
    DocumentReference reference,
  ) =>
      ColeccionInternaRecord._(reference, mapFromFirestore(data));

  @override
  String toString() =>
      'ColeccionInternaRecord(reference: ${reference.path}, data: $snapshotData)';

  @override
  int get hashCode => reference.path.hashCode;

  @override
  bool operator ==(other) =>
      other is ColeccionInternaRecord &&
      reference.path.hashCode == other.reference.path.hashCode;
}

Map<String, dynamic> createColeccionInternaRecordData({
  String? portada,
  String? info,
  String? nombre,
}) {
  final firestoreData = mapToFirestore(
    <String, dynamic>{
      'portada': portada,
      'info': info,
      'nombre': nombre,
    }.withoutNulls,
  );

  return firestoreData;
}

class ColeccionInternaRecordDocumentEquality
    implements Equality<ColeccionInternaRecord> {
  const ColeccionInternaRecordDocumentEquality();

  @override
  bool equals(ColeccionInternaRecord? e1, ColeccionInternaRecord? e2) {
    return e1?.portada == e2?.portada &&
        e1?.info == e2?.info &&
        e1?.nombre == e2?.nombre;
  }

  @override
  int hash(ColeccionInternaRecord? e) =>
      const ListEquality().hash([e?.portada, e?.info, e?.nombre]);

  @override
  bool isValidKey(Object? o) => o is ColeccionInternaRecord;
}
