package com.ms.clients.controllers;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.ms.clients.entities.Clients;
import com.ms.clients.services.ClientsImpl;

@ExtendWith(MockitoExtension.class)
public class ClientsControllerTest {
	
	
	@Mock
    private ClientsImpl clientsImpl;

    @InjectMocks
    private ClientsController clientsController;
    
    @Test
    void listAllClients_Success() {
        List<Clients> clientsList = new ArrayList<>();
        clientsList.add(new Clients("prueba1","prueba2","prueba3","prueba4","prueba5"));
        clientsList.add(new Clients("prueba1","prueba2","prueba3","prueba4","prueba5"));
        when(clientsImpl.findAll()).thenReturn(clientsList);
        List<Clients> returnedClients = clientsController.listAllClients();
        assertEquals(clientsList.size(), returnedClients.size());
    }
    
    @Test
    void deleteEmployee_Success() {
        String sharedKey = "yourSharedKey";
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Cliente eliminado con éxito.");
        doNothing().when(clientsImpl).delete(sharedKey);
        ResponseEntity<?> responseEntity = clientsController.deleteEmployee(sharedKey);
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals(response, responseEntity.getBody());
    }
    
//    @Test
//    void deleteEmployee_Failure() {
//        String sharedKey = "yourSharedKey";
//        Map<String, Object> response = new HashMap<>();
//        response.put("message", "Error al hacer la eliminacion en la base de datos.");
//        DataAccessException dataAccessException = null;
//        doThrow(dataAccessException).when(clientsImpl).delete(sharedKey);
//        ResponseEntity<?> responseEntity = clientsController.deleteEmployee(sharedKey);
//        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, responseEntity.getStatusCode());
//        assertEquals(response.get("message"), ((Map<?, ?>) responseEntity.getBody()).get("message"));
//    }
    
    
    @Test
    void updateEmpleado_Success() {
        Clients clientToUpdate = new Clients("prueba1","prueba2","prueba3","prueba4","prueba5");
        when(clientsImpl.update(clientToUpdate)).thenReturn(clientToUpdate);
        ResponseEntity<?> responseEntity = clientsController.updateEmpleado(clientToUpdate);
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
    }
    
    
    @Test
    void registerClients_Success() {
        Clients clientToRegister = new Clients("prueba1","prueba2","prueba3","prueba4","prueba5");
        when(clientsImpl.findById(clientToRegister.getSharedKey())).thenReturn(null);
        ResponseEntity<?> responseEntity = clientsController.registerClients(clientToRegister);
        assertEquals(HttpStatus.CREATED, responseEntity.getStatusCode());
    }
    
    @Test
    void registerClients_ClientAlreadyExists() {
        Clients existingClient = new Clients("prueba1","prueba2","prueba3","prueba4","prueba5");
        when(clientsImpl.findById(existingClient.getSharedKey())).thenReturn(existingClient);
        ResponseEntity<?> responseEntity = clientsController.registerClients(existingClient);
        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, responseEntity.getStatusCode());
    }
}
