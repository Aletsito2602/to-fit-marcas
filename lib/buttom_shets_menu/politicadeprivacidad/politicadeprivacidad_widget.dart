import '/flutter_flow/flutter_flow_theme.dart';
import '/flutter_flow/flutter_flow_util.dart';
import 'dart:ui';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'politicadeprivacidad_model.dart';
export 'politicadeprivacidad_model.dart';

class PoliticadeprivacidadWidget extends StatefulWidget {
  const PoliticadeprivacidadWidget({super.key});

  @override
  State<PoliticadeprivacidadWidget> createState() =>
      _PoliticadeprivacidadWidgetState();
}

class _PoliticadeprivacidadWidgetState
    extends State<PoliticadeprivacidadWidget> {
  late PoliticadeprivacidadModel _model;

  @override
  void setState(VoidCallback callback) {
    super.setState(callback);
    _model.onUpdate();
  }

  @override
  void initState() {
    super.initState();
    _model = createModel(context, () => PoliticadeprivacidadModel());

    WidgetsBinding.instance.addPostFrameCallback((_) => safeSetState(() {}));
  }

  @override
  void dispose() {
    _model.maybeDispose();

    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Align(
      alignment: AlignmentDirectional(0.0, 1.0),
      child: Container(
        width: double.infinity,
        height: MediaQuery.sizeOf(context).height * 0.85,
        decoration: BoxDecoration(
          color: Color(0xA0000000),
          borderRadius: BorderRadius.only(
            bottomLeft: Radius.circular(0.0),
            bottomRight: Radius.circular(0.0),
            topLeft: Radius.circular(20.0),
            topRight: Radius.circular(20.0),
          ),
        ),
        child: ClipRRect(
          borderRadius: BorderRadius.circular(0.0),
          child: BackdropFilter(
            filter: ImageFilter.blur(
              sigmaX: 2.0,
              sigmaY: 2.0,
            ),
            child: Padding(
              padding: EdgeInsetsDirectional.fromSTEB(20.0, 0.0, 20.0, 0.0),
              child: SingleChildScrollView(
                child: Column(
                  mainAxisSize: MainAxisSize.max,
                  children: [
                    SizedBox(
                      width: 100.0,
                      child: Divider(
                        height: 25.0,
                        thickness: 3.0,
                        color: FlutterFlowTheme.of(context).alternate,
                      ),
                    ),
                    Row(
                      mainAxisSize: MainAxisSize.max,
                      children: [
                        Expanded(
                          child: Text(
                            'Politica de privacidad',
                            style: FlutterFlowTheme.of(context)
                                .bodyMedium
                                .override(
                                  font: GoogleFonts.manrope(
                                    fontWeight: FontWeight.w600,
                                    fontStyle: FlutterFlowTheme.of(context)
                                        .bodyMedium
                                        .fontStyle,
                                  ),
                                  fontSize: 30.0,
                                  letterSpacing: 0.0,
                                  fontWeight: FontWeight.w600,
                                  fontStyle: FlutterFlowTheme.of(context)
                                      .bodyMedium
                                      .fontStyle,
                                ),
                          ),
                        ),
                      ],
                    ),
                    Expanded(
                      child: Padding(
                        padding:
                            EdgeInsetsDirectional.fromSTEB(0.0, 15.0, 0.0, 0.0),
                        child: Row(
                          mainAxisSize: MainAxisSize.max,
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Expanded(
                              child: Padding(
                                padding: EdgeInsetsDirectional.fromSTEB(
                                    0.0, 0.0, 0.0, 15.0),
                                child: Text(
                                  'En To Fit  nos comprometemos a proteger tu privacidad y a garantizar la seguridad de tus datos personales.\n\nA través de nuestra aplicación, recopilamos información que nos ayuda a mejorar tu experiencia, personalizar contenidos y ofrecerte promociones y recomendaciones acordes a tus intereses. Esto puede incluir:\n\nDatos Personales: Nombre, correo electrónico, datos de contacto y otra información que proporciones al registrarte.\n\nDatos de Uso: Información sobre cómo interactúas con la app, tus preferencias de navegación, dispositivos utilizados y ubicación aproximada (si la activas).\n\nUso y Protección de tus Datos:\n\nUtilizamos tus datos exclusivamente para prestar y mejorar nuestros servicios, comunicarnos contigo y personalizar tu experiencia en la app. Contamos con medidas técnicas y organizativas para proteger tu información de accesos no autorizados o divulgación.\n\nCompartición de Datos:\n\nNo vendemos ni alquilamos tu información personal a terceros. En casos necesarios, podremos compartirla con proveedores de servicios, siempre bajo estrictos acuerdos de confidencialidad y solo para fines operativos.\n\nTus Derechos:\n\nTienes derecho a acceder, corregir o solicitar la eliminación de tus datos personales. Para ello, contáctanos a través de nuestro servicio de atención.\n\nActualizaciones:\n\nEstas políticas podrán actualizarse para reflejar cambios en nuestras prácticas o requisitos legales. \n\nTe notificaremos sobre actualizaciones significativas a través de la app o por correo electrónico.',
                                  style: FlutterFlowTheme.of(context)
                                      .bodyMedium
                                      .override(
                                        font: GoogleFonts.manrope(
                                          fontWeight:
                                              FlutterFlowTheme.of(context)
                                                  .bodyMedium
                                                  .fontWeight,
                                          fontStyle:
                                              FlutterFlowTheme.of(context)
                                                  .bodyMedium
                                                  .fontStyle,
                                        ),
                                        fontSize: 15.0,
                                        letterSpacing: 0.0,
                                        fontWeight: FlutterFlowTheme.of(context)
                                            .bodyMedium
                                            .fontWeight,
                                        fontStyle: FlutterFlowTheme.of(context)
                                            .bodyMedium
                                            .fontStyle,
                                      ),
                                ),
                              ),
                            ),
                          ],
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }
}
